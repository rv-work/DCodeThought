import app from "./app.js";
import connectDB from "./config/db.js";
import { startCronJobs } from "./cron/StreakCron.js";

const PORT = process.env.PORT || 5100;

const startServer = async () => {
  try {
    await connectDB();
    startCronJobs();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
