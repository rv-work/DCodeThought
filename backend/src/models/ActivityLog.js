import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  
  // Date stored as YYYY-MM-DD string to easily group by day for the Heatmap
  dateString: { type: String, required: true }, 
  
  // Type of activity
  type: { type: String, enum: ["potd", "contest", "practice"], required: true },
  
  createdAt: { type: Date, default: Date.now }
});

// Composite index to prevent a user from logging the same problem twice on the same day
ActivityLogSchema.index({ userId: 1, problemId: 1, dateString: 1 }, { unique: true });

export default mongoose.model("ActivityLog", ActivityLogSchema);