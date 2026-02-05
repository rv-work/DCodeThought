import app from "./app.js";
import connectDB from "./config/db.js";
import connectRedis from "./config/redis.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    // MongoDB
    await connectDB();

    // Redis
    await connectRedis();

    // Start Express
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
