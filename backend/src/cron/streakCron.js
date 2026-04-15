import cron from "node-cron";
import User from "../models/User.js";

export const startCronJobs = () => {
  // Ye job roz raat 12:00 AM par chalegi (00:00)
  cron.schedule("0 0 * * *", async () => {
    console.log("CRON JOB STARTED: Checking and Resetting Streaks...");

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Aaj ki shuruaat (Midnight)
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1); 
      // Jo log 'yesterday' se pehle aakhri baar active the, unki streak gai.

      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 8); 
      // Contest 7 din ka hota hai, so 8 din ka gap check kar rahe hain

      // 1. GENERAL STREAK & CHALLENGE RESET
      // Find: Last activity is older than yesterday
      const generalResetResult = await User.updateMany(
        { "streaks.lastActivityDate": { $lt: yesterday } },
        { 
          $set: { 
            "streaks.currentGeneral": 0,
            "challenge.progress": 0 
          } 
        }
      );
      console.log(`Reset General Streak & Challenges for ${generalResetResult.modifiedCount} users.`);

      // 2. POTD STREAK RESET
      const potdResetResult = await User.updateMany(
        { "streaks.lastPotdDate": { $lt: yesterday } },
        { $set: { "streaks.currentPotd": 0 } }
      );
      console.log(`Reset POTD Streaks for ${potdResetResult.modifiedCount} users.`);

      // 3. CONTEST STREAK RESET (Weekly based)
      const contestResetResult = await User.updateMany(
        { "streaks.lastContestDate": { $lt: lastWeek } },
        { $set: { "streaks.currentContest": 0 } }
      );
      console.log(`Reset Contest Streaks for ${contestResetResult.modifiedCount} users.`);

      console.log("CRON JOB COMPLETED: All outdated streaks are successfully reset to 0.");

    } catch (error) {
      console.error("CRON JOB ERROR: Failed to reset streaks", error);
    }
  }, {
    timezone: "Asia/Kolkata" // Indian Standard Time ke hisab se raat 12 baje
  });
};