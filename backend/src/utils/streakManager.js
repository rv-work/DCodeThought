import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";

export const updateStreakAndLogActivity = async (userId, problemId, problemType = "practice") => {
  try {
    const today = new Date();
    // Get date in YYYY-MM-DD format
    const dateString = today.toISOString().split("T")[0]; 

    // 1. Log the Activity safely (Don't return on duplicate, just continue)
    try {
      await ActivityLog.create({ userId, problemId, dateString, type: problemType });
    } catch (err) {
      if (err.code !== 11000) {
        throw err; // If it's not a duplicate error, throw it
      }
      // If it IS duplicate 11000 (same problem today), we just ignore the error and continue 
      // so the Streak & Challenge logic still gets a chance to evaluate.
    }

    // 2. Fetch User to calculate Streak
    const user = await User.findById(userId);
    if (!user) return;

    // Calculate Dates
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];
    
    const lastActivityString = user.streaks?.lastActivityDate 
      ? new Date(user.streaks.lastActivityDate).toISOString().split("T")[0] 
      : null;

    // Ensure challenge object exists safely
    if (!user.challenge) user.challenge = { activeDays: 0, progress: 0, startDate: null };

    // Was any problem solved today BEFORE this submission?
    const isFirstSolveOfToday = (lastActivityString !== dateString);

    // ==========================================
    // 3. GENERAL STREAK LOGIC
    // ==========================================
    if (isFirstSolveOfToday) {
      if (lastActivityString === yesterdayString) {
        // Streak continues! 🚀
        user.streaks.currentGeneral += 1;
      } else {
        // Streak broke or first time solving 😢
        user.streaks.currentGeneral = 1;
        
        // 💥 PUNISHMENT: If streak breaks, Challenge Progress resets to 0!
        if (user.challenge.activeDays > 0) {
          user.challenge.progress = 0;
        }
      }

      // Update Max General Streak
      if (user.streaks.currentGeneral > (user.streaks.maxGeneral || 0)) {
        user.streaks.maxGeneral = user.streaks.currentGeneral;
      }
      
      // Update Last Activity Date
      user.streaks.lastActivityDate = today;
    }

    // ==========================================
    // 4. CHALLENGE PROGRESS LOGIC
    // ==========================================
    if (user.challenge.activeDays > 0) {
      // Condition: Either it's the first solve of the day, OR they just joined the challenge today (progress is 0)
      if (isFirstSolveOfToday || user.challenge.progress === 0) {
        
        user.challenge.progress += 1;
        const progress = user.challenge.progress;
        
        // Badge Progression System
        const badges = new Set(user.badges || []); 
        if (progress >= 365) { badges.add("365_Days"); badges.delete("200_Days"); }
        else if (progress >= 200) { badges.add("200_Days"); badges.delete("100_Days"); }
        else if (progress >= 100) { badges.add("100_Days"); badges.delete("50_Days"); }
        else if (progress >= 50) { badges.add("50_Days"); badges.delete("30_Days"); }
        else if (progress >= 30) { badges.add("30_Days"); }

        user.badges = Array.from(badges);

        // If Challenge Completed!
        if (progress >= user.challenge.activeDays) {
          user.challenge.activeDays = null; // Mark completed
        }
      }
    }

    // ==========================================
    // 5. POTD & CONTEST SPECIFIC STREAKS
    // ==========================================
    if (problemType === "potd") {
      const lastPotdString = user.streaks?.lastPotdDate ? new Date(user.streaks.lastPotdDate).toISOString().split("T")[0] : null;
      if (lastPotdString !== dateString) {
        if (lastPotdString === yesterdayString) user.streaks.currentPotd = (user.streaks.currentPotd || 0) + 1;
        else user.streaks.currentPotd = 1;

        if (user.streaks.currentPotd > (user.streaks.maxPotd || 0)) user.streaks.maxPotd = user.streaks.currentPotd;
        user.streaks.lastPotdDate = today;
      }
    }

    if (problemType === "contest") {
      const lastContestString = user.streaks?.lastContestDate ? new Date(user.streaks.lastContestDate).toISOString().split("T")[0] : null;
      if (lastContestString !== dateString) {
        if (lastContestString === yesterdayString) user.streaks.currentContest = (user.streaks.currentContest || 0) + 1;
        else user.streaks.currentContest = 1;

        if (user.streaks.currentContest > (user.streaks.maxContest || 0)) user.streaks.maxContest = user.streaks.currentContest;
        user.streaks.lastContestDate = today;
      }
    }

    // 🔥 VITAL: Force Mongoose to save nested objects
    user.markModified("streaks");
    user.markModified("challenge");
    user.markModified("badges");

    // Save the completely updated user data
    await user.save();
    
    return { success: true, newStreak: user.streaks.currentGeneral };

  } catch (error) {
    console.error("Error updating streak/challenge:", error);
  }
};