import cron from "node-cron";
import User from "../models/User.js";

export const startCronJobs = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("CRON JOB STARTED: Checking and Resetting Streaks...");

    try {
      // 1. Get today's date exactly in IST format (YYYY-MM-DD)
      const todayISTString = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
      const [year, month, day] = todayISTString.split('-');

      // 2. Create STRICT Date objects for Midnight boundaries using +05:30 (IST offset)
      // Ye exactly aaj raat 12:00 AM IST ka exact millisecond time banayega
      const todayMidnightIST = new Date(`${year}-${month}-${day}T00:00:00+05:30`);
      
      // 3. Yesterday Midnight IST (Aakhri 24 ghante ki shuruaat)
      const yesterdayMidnightIST = new Date(todayMidnightIST.getTime() - 24 * 60 * 60 * 1000);
      
      // 4. Last Week Midnight IST (Contest ke liye)
      const lastWeekMidnightIST = new Date(todayMidnightIST.getTime() - 8 * 24 * 60 * 60 * 1000);

      // --- 1. GENERAL STREAK & CHALLENGE RESET ---
      // Agar last activity kal (yesterday) raat 12 baje se pehle ki hai, matlab kal poora din miss ho gaya
      const generalResetResult = await User.updateMany(
        { "streaks.lastActivityDate": { $lt: yesterdayMidnightIST } },
        { 
          $set: { 
            "streaks.currentGeneral": 0,
            "challenge.progress": 0 
          } 
        }
      );
      console.log(`Reset General Streak & Challenges for ${generalResetResult.modifiedCount} users.`);

      // --- 2. POTD STREAK RESET ---
      const potdResetResult = await User.updateMany(
        { "streaks.lastPotdDate": { $lt: yesterdayMidnightIST } },
        { $set: { "streaks.currentPotd": 0 } }
      );
      console.log(`Reset POTD Streaks for ${potdResetResult.modifiedCount} users.`);

      // --- 3. CONTEST STREAK RESET ---
      const contestResetResult = await User.updateMany(
        { "streaks.lastContestDate": { $lt: lastWeekMidnightIST } },
        { $set: { "streaks.currentContest": 0 } }
      );
      console.log(`Reset Contest Streaks for ${contestResetResult.modifiedCount} users.`);

      console.log("CRON JOB COMPLETED: All outdated streaks are successfully reset to 0.");

    } catch (error) {
      console.error("CRON JOB ERROR: Failed to reset streaks", error);
    }
  }, {
    timezone: "Asia/Kolkata"
  });
};