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
  problemType = "practice"
) => {
  try {
    const now = new Date();

    // IST based date strings
    const dateString = getISTDateString(now);

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = getISTDateString(yesterday);

    // 1. Log Activity for Heatmap
    try {
      await ActivityLog.create({
        userId,
        problemId,
        dateString,
        type: problemType,
      });
    } catch (err) {
      if (err.code !== 11000) throw err;
      // Duplicate activity for same day ignore kar do
    }

    // 2. Fetch User
    const user = await User.findById(userId);
    if (!user) return;

    const lastActivityString = user.streaks?.lastActivityDate
      ? getISTDateString(new Date(user.streaks.lastActivityDate))
      : null;

    // Safety check for Challenge Object
    if (!user.challenge) {
      user.challenge = {
        activeDays: null,
        progress: 0,
        startDate: null,
      };
    }

    // Kya aaj ki pehli activity hai?
    const isFirstSolveOfToday = lastActivityString !== dateString;

    // ==========================================
    // A. GENERAL STREAK & CHALLENGE LOGIC
    // ==========================================
    if (isFirstSolveOfToday) {
      if (lastActivityString === yesterdayString) {
        user.streaks.currentGeneral += 1;
      } else {
        user.streaks.currentGeneral = 1;

        // Agar streak toot gayi to challenge reset
        if (user.challenge.activeDays) {
          user.challenge.progress = 0;
        }
      }

      if (
        user.streaks.currentGeneral >
        (user.streaks.maxGeneral || 0)
      ) {
        user.streaks.maxGeneral = user.streaks.currentGeneral;
      }

      user.streaks.lastActivityDate = now;

      // --- CHALLENGE PROGRESSION ---
      if (user.challenge.activeDays) {
        user.challenge.progress += 1;
        const progress = user.challenge.progress;

        const badges = new Set(user.badges || []);

        if (progress >= 365) {
          badges.add("365_Days");
          badges.delete("200_Days");
        } else if (progress >= 200) {
          badges.add("200_Days");
          badges.delete("100_Days");
        } else if (progress >= 100) {
          badges.add("100_Days");
          badges.delete("50_Days");
        } else if (progress >= 50) {
          badges.add("50_Days");
          badges.delete("30_Days");
        } else if (progress >= 30) {
          badges.add("30_Days");
        }

        user.badges = Array.from(badges);

        if (progress >= user.challenge.activeDays) {
          user.challenge.activeDays = null;
        }
      }
    } else {
      // User ne already aaj solve kiya tha but challenge abhi join kiya
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
          user.streaks.currentPotd =
            (user.streaks.currentPotd || 0) + 1;
        } else {
          user.streaks.currentPotd = 1;
        }

        if (
          user.streaks.currentPotd >
          (user.streaks.maxPotd || 0)
        ) {
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
        const lastContestDate = user.streaks.lastContestDate
          ? new Date(user.streaks.lastContestDate)
          : null;

        let daysDiff = 9999;

        if (lastContestDate) {
          const contestToday = new Date(getISTDateString(now));
          const contestLastDate = new Date(
            getISTDateString(lastContestDate)
          );

          daysDiff = Math.floor(
            (contestToday - contestLastDate) / (1000 * 60 * 60 * 24)
          );
        }

        if (daysDiff <= 8 && daysDiff > 0) {
          user.streaks.currentContest =
            (user.streaks.currentContest || 0) + 1;
        } else {
          user.streaks.currentContest = 1;
        }

        if (
          user.streaks.currentContest >
          (user.streaks.maxContest || 0)
        ) {
          user.streaks.maxContest = user.streaks.currentContest;
        }

        user.streaks.lastContestDate = now;
      }
    }

    // Force mark nested fields modified
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