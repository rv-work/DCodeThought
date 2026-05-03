import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";

// Always return IST date string in YYYY-MM-DD format
const getISTDateString = (date = new Date()) => {
  return date.toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
};

export const updateStreakAndLogActivity = async (
  userId,
  problemId,
  problemType = "practice",
  solveCount = 1 // 🔥 Naya parameter add kiya for Heatmap count sync
) => {
  try {
    const now = new Date();

    // 1. Aaj aur kal ki strict IST date strings nikalna
    const dateString = getISTDateString(now);
    
    // Exactly 24 hours subtract karke 'yesterday' nikalna is mathematically safer
    const yesterdayDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayString = getISTDateString(yesterdayDate);

    // ==========================================
    // 🔥 1. SMART ACTIVITY LOGGING (Duplicate Fix)
    // ==========================================
    try {
      if (problemId === null) {
        // LeetCode Sync ke liye: Agar same day dubara sync ho raha hai toh TOTAL count SET kar do
        await ActivityLog.findOneAndUpdate(
          { userId, problemId: null, dateString },
          { $set: { type: problemType, count: solveCount } }, 
          { upsert: true, new: true }
        );
      } else {
        // Internal platform problem ke liye: Count humesha 1 rahega, same problem duplicate nahi hogi
        await ActivityLog.findOneAndUpdate(
          { userId, problemId, dateString },
          { $setOnInsert: { type: problemType, count: 1 } },
          { upsert: true, new: true }
        );
      }
    } catch (err) {
      console.error("Activity log upsert failed:", err);
    }

    // ==========================================
    // 2. FETCH USER & CHECK PREVIOUS ACTIVITY
    // ==========================================
    const user = await User.findById(userId);
    if (!user) return;

    const lastActivityString = user.streaks?.lastActivityDate
      ? getISTDateString(new Date(user.streaks.lastActivityDate))
      : null;

    // Safety check for Challenge Object
    if (!user.challenge) {
      user.challenge = { activeDays: null, progress: 0, startDate: null };
    }

    // Aaj ki pehli activity check
    const isFirstSolveOfToday = lastActivityString !== dateString;

    // ==========================================
    // A. GENERAL STREAK & CHALLENGE LOGIC
    // ==========================================
    if (isFirstSolveOfToday) {
      
      if (lastActivityString === yesterdayString) {
        // Kal solve kiya tha, toh streak +1 karo
        user.streaks.currentGeneral += 1;
      } else {
        // Kal solve NAHI kiya tha, toh streak dobara 1 se shuru hogi
        user.streaks.currentGeneral = 1;

        if (user.challenge.activeDays) {
          user.challenge.progress = 0; // Streak tutne par challenge reset
        }
      }

      // Update max streak
      if (user.streaks.currentGeneral > (user.streaks.maxGeneral || 0)) {
        user.streaks.maxGeneral = user.streaks.currentGeneral;
      }

      // Last activity update karo
      user.streaks.lastActivityDate = now;

      // --- CHALLENGE PROGRESSION ---
      if (user.challenge.activeDays) {
        user.challenge.progress += 1;
        const progress = user.challenge.progress;
        const badges = new Set(user.badges || []);

        if (progress >= 365) { badges.add("365_Days"); badges.delete("200_Days"); }
        else if (progress >= 200) { badges.add("200_Days"); badges.delete("100_Days"); }
        else if (progress >= 100) { badges.add("100_Days"); badges.delete("50_Days"); }
        else if (progress >= 50) { badges.add("50_Days"); badges.delete("30_Days"); }
        else if (progress >= 30) { badges.add("30_Days"); }

        user.badges = Array.from(badges);

        if (progress >= user.challenge.activeDays) {
          user.challenge.activeDays = null;
        }
      }
    } else {
      // Aaj already solve kiya tha, par aaj hi naya challenge liya hai
      if (user.challenge.activeDays && user.challenge.progress === 0) {
        user.challenge.progress = 1;
      }
    }

    // ==========================================
    // B. POTD SPECIFIC LOGIC
    // ==========================================
    if (problemType === "potd") {
      const lastPotdString = user.streaks?.lastPotdDate
        ? getISTDateString(new Date(user.streaks.lastPotdDate))
        : null;

      if (lastPotdString !== dateString) {
        if (lastPotdString === yesterdayString) {
          user.streaks.currentPotd = (user.streaks.currentPotd || 0) + 1;
        } else {
          user.streaks.currentPotd = 1;
        }

        if (user.streaks.currentPotd > (user.streaks.maxPotd || 0)) {
          user.streaks.maxPotd = user.streaks.currentPotd;
        }
        user.streaks.lastPotdDate = now;
      }
    }

    // ==========================================
    // C. CONTEST SPECIFIC LOGIC
    // ==========================================
    if (problemType === "contest") {
      const lastContestString = user.streaks?.lastContestDate
        ? getISTDateString(new Date(user.streaks.lastContestDate))
        : null;

      if (lastContestString !== dateString) {
        let daysDiff = 9999;
        if (user.streaks.lastContestDate) {
          // Calculate difference logically in IST
          const contestToday = new Date(dateString);
          const contestLastDate = new Date(lastContestString);
          daysDiff = Math.floor((contestToday - contestLastDate) / (1000 * 60 * 60 * 24));
        }

        // Contest is weekly, giving an 8-day grace period
        if (daysDiff <= 8 && daysDiff > 0) {
          user.streaks.currentContest = (user.streaks.currentContest || 0) + 1;
        } else {
          user.streaks.currentContest = 1;
        }

        if (user.streaks.currentContest > (user.streaks.maxContest || 0)) {
          user.streaks.maxContest = user.streaks.currentContest;
        }
        user.streaks.lastContestDate = now;
      }
    }

    // Force mark modified to let mongoose know nested object changed
    user.markModified("streaks");
    user.markModified("challenge");
    user.markModified("badges");

    await user.save();

    return {
      success: true,
      newStreak: user.streaks.currentGeneral,
    };
  } catch (error) {
    console.error("Error updating streak/challenge:", error);
  }
};