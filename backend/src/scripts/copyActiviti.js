import mongoose from "mongoose";
import dotenv from "dotenv";
import ActivityLog from "../models/ActivityLog.js"; // Path ek baar verify kar lena

// Agar tumhari .env file root folder me hai, toh dotenv load karna zaroori hai
dotenv.config(); 

const cleanDatabaseMigration = async () => {
  try {
    console.log("Connecting to Database... ⏳");
    
    // Apni .env file ka exact variable name use karna, usually MONGO_URI hota hai
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully! 🟢\n");

    console.log("Starting DB Cleanup... 🧹");

    const result = await ActivityLog.updateMany(
      { 
        $or: [
          { count: { $exists: false } }, 
          { count: null }
        ] 
      },
      { $set: { count: 1 } } 
    );

    console.log(`\nCleanup Done! Database ekdam chamak gaya! ✨`);
    console.log(`Matched Records: ${result.matchedCount}`);
    console.log(`Modified Records: ${result.modifiedCount}\n`);

  } catch (error) {
    console.error("Cleanup Error ❌:", error);
  } finally {
    // Kaam khatam hone ke baad connection band karna zaroori hai script me
    console.log("Disconnecting from Database... 🔌");
    await mongoose.disconnect();
    process.exit(0); // Script ko successfully stop karne ke liye
  }
};

// Function ko yahan call kar rahe hain
cleanDatabaseMigration();