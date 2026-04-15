import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";

export const updateStreakAndLogActivity = async (userId, problemId, problemType = "practice") => {
  try {
    const today = new Date();
    const dateString = today.toISOString().split("T")[0]; 

    // 1. Log Activity for Heatmap
    try {
      await ActivityLog.create({ userId, problemId, dateString, type: problemType });
    } catch (err) {
      if (err.code !== 11000) throw err; 
      // Ignored duplicate error to let streak calculation continue
    }

    // 2. Fetch User
    const user = await User.findById(userId);
    if (!user) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];
    
    const lastActivityString = user.streaks?.lastActivityDate 
      ? new Date(user.streaks.lastActivityDate).toISOString().split("T")[0] 
      : null;

    // Safety check for Challenge Object
    if (!user.challenge) {
      user.challenge = { activeDays: null, progress: 0, startDate: null };
    }

    // Kya aaj ki pehli activity hai?
    const isFirstSolveOfToday = (lastActivityString !== dateString);

    // ==========================================
    // A. GENERAL STREAK & CHALLENGE LOGIC 
    // ==========================================
    if (isFirstSolveOfToday) {
      if (lastActivityString === yesterdayString) {
        user.streaks.currentGeneral += 1;
      } else {
        user.streaks.currentGeneral = 1;
        
        // 💥 PUNISHMENT: Streak tooti, challenge reset!
        // 👇 FIX: Checked directly if activeDays is truthy (not null)
        if (user.challenge.activeDays) {
          user.challenge.progress = 0;
        }
      }

      if (user.streaks.currentGeneral > (user.streaks.maxGeneral || 0)) {
        user.streaks.maxGeneral = user.streaks.currentGeneral;
      }
      
      user.streaks.lastActivityDate = today;

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
          user.challenge.activeDays = null; // Challenge Completed!
        }
      }
    } else {
      // 👇 FIX (THE EDGE CASE): User ne aaj ka task kar liya tha, 
      // PAR usne challenge abhi-abhi join kiya hai jiska progress 0 hai.
      if (user.challenge.activeDays && user.challenge.progress === 0) {
        user.challenge.progress = 1;
      }
    }

    // ==========================================
    // B. POTD SPECIFIC LOGIC
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

    // ==========================================
    // C. CONTEST SPECIFIC LOGIC
    // ==========================================
    if (problemType === "contest") {
      const lastContestString = user.streaks?.lastContestDate ? new Date(user.streaks.lastContestDate).toISOString().split("T")[0] : null;
      if (lastContestString !== dateString) {
        
        const lastContestDate = user.streaks.lastContestDate ? new Date(user.streaks.lastContestDate) : new Date(0);
        const daysDiff = Math.floor((today - lastContestDate) / (1000 * 60 * 60 * 24));

        if (daysDiff <= 8 && daysDiff > 0) { 
          user.streaks.currentContest = (user.streaks.currentContest || 0) + 1;
        } else {
          user.streaks.currentContest = 1;
        }

        if (user.streaks.currentContest > (user.streaks.maxContest || 0)) user.streaks.maxContest = user.streaks.currentContest;
        user.streaks.lastContestDate = today;
      }
    }

    // 🔥 Force mark modified so nested objects save securely
    user.markModified("streaks");
    user.markModified("challenge");
    user.markModified("badges");

    await user.save();
    return { success: true, newStreak: user.streaks.currentGeneral };

  } catch (error) {
    console.error("Error updating streak/challenge:", error);
  }
};