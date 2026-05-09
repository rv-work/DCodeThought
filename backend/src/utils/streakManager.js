import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";

// 🔥 FIX: Always return Date String based on UTC (Day changes at 5:30 AM IST)
const getGlobalDateString = (date = new Date()) => {
  return date.toISOString().split("T")[0]; 
};

export const updateStreakAndLogActivity = async (
  userId,
  problemId,
  problemType = "practice",
  solveCount = 1 
) => {
  try {
    const now = new Date();

    const dateString = getGlobalDateString(now);
    
    const yesterdayDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayString = getGlobalDateString(yesterdayDate);

    // 1. SMART ACTIVITY LOGGING
    try {
      if (problemId === null) {
        await ActivityLog.findOneAndUpdate(
          { userId, problemId: null, dateString },
          { $set: { type: problemType, count: solveCount } }, 
          { upsert: true, new: true }
        );
      } else {
        await ActivityLog.findOneAndUpdate(
          { userId, problemId, dateString },
          { $setOnInsert: { type: problemType, count: 1 } },
          { upsert: true, new: true }
        );
      }
    } catch (err) {
      console.error("Activity log upsert failed:", err);
    }

    // 2. FETCH USER
    const user = await User.findById(userId);
    if (!user) return;

    const lastActivityString = user.streaks?.lastActivityDate
      ? getGlobalDateString(new Date(user.streaks.lastActivityDate))
      : null;

    if (!user.challenge) {
      user.challenge = { activeDays: null, progress: 0, startDate: null };
    }

    const isFirstSolveOfToday = lastActivityString !== dateString;

    // A. GENERAL STREAK & CHALLENGE LOGIC
    if (isFirstSolveOfToday) {
      
      if (lastActivityString === yesterdayString) {
        user.streaks.currentGeneral += 1;
      } else {
        user.streaks.currentGeneral = 1;
        if (user.challenge.activeDays) {
          user.challenge.progress = 0; 
        }
      }

      if (user.streaks.currentGeneral > (user.streaks.maxGeneral || 0)) {
        user.streaks.maxGeneral = user.streaks.currentGeneral;
      }

      user.streaks.lastActivityDate = now;

      // CHALLENGE PROGRESSION
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
      if (user.challenge.activeDays && user.challenge.progress === 0) {
        user.challenge.progress = 1;
      }
    }

    // B. POTD SPECIFIC LOGIC
    if (problemType === "potd") {
      const lastPotdString = user.streaks?.lastPotdDate
        ? getGlobalDateString(new Date(user.streaks.lastPotdDate))
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

    // C. CONTEST SPECIFIC LOGIC
    if (problemType === "contest") {
      const lastContestString = user.streaks?.lastContestDate
        ? getGlobalDateString(new Date(user.streaks.lastContestDate))
        : null;

      if (lastContestString !== dateString) {
        let daysDiff = 9999;
        if (user.streaks.lastContestDate) {
          // Calculation based on UTC boundary
          const contestToday = new Date(dateString);
          const contestLastDate = new Date(lastContestString);
          daysDiff = Math.floor((contestToday - contestLastDate) / (1000 * 60 * 60 * 24));
        }

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