import cron from "node-cron";
import User from "../models/User.js";

export const startCronJobs = () => {
  // 🔥 Runs at exactly 00:00 UTC (Which is exactly 5:30 AM IST)
  cron.schedule("0 0 * * *", async () => {
    console.log("CRON JOB STARTED: Checking and Resetting Streaks at 5:30 AM IST...");

    try {
      const now = new Date();
      now.setUTCHours(0, 0, 0, 0); // Today 5:30 AM IST (00:00 UTC)
      const todayMidnightUTC = now;
      
      const yesterdayMidnightUTC = new Date(todayMidnightUTC.getTime() - 24 * 60 * 60 * 1000);
      const lastWeekMidnightUTC = new Date(todayMidnightUTC.getTime() - 8 * 24 * 60 * 60 * 1000);

      const generalResetResult = await User.updateMany(
        { "streaks.lastActivityDate": { $lt: yesterdayMidnightUTC } },
        { 
          $set: { 
            "streaks.currentGeneral": 0,
            "challenge.progress": 0 
          } 
        }
      );
      console.log(`Reset General Streak & Challenges for ${generalResetResult.modifiedCount} users.`);

      const potdResetResult = await User.updateMany(
        { "streaks.lastPotdDate": { $lt: yesterdayMidnightUTC } },
        { $set: { "streaks.currentPotd": 0 } }
      );
      console.log(`Reset POTD Streaks for ${potdResetResult.modifiedCount} users.`);

      const contestResetResult = await User.updateMany(
        { "streaks.lastContestDate": { $lt: lastWeekMidnightUTC } },
        { $set: { "streaks.currentContest": 0 } }
      );
      console.log(`Reset Contest Streaks for ${contestResetResult.modifiedCount} users.`);

      console.log("CRON JOB COMPLETED: Outdated streaks reset.");

    } catch (error) {
      console.error("CRON JOB ERROR:", error);
    }
  }, {
    timezone: "UTC" // 🔥 Timezone change to UTC
  });
};