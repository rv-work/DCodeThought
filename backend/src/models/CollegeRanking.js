import mongoose from "mongoose";

const CollegeRankingSchema = new mongoose.Schema({
  collegeName: { type: String, required: true, unique: true },
  
  // Total score calculated by adding max streaks of all students in this college
  totalStreakScore: { type: Number, default: 0 },
  
  // Number of active students from this college
  studentCount: { type: Number, default: 0 },

  lastCalculatedAt: { type: Date, default: Date.now }
});

// Index to sort leaderboard quickly
CollegeRankingSchema.index({ totalStreakScore: -1 });

export default mongoose.model("CollegeRanking", CollegeRankingSchema);