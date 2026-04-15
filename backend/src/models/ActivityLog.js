import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: false }, 
  
  dateString: { type: String, required: true }, 
  
  type: { type: String, enum: ["potd", "contest", "practice", "feed"], required: true },
  
  createdAt: { type: Date, default: Date.now }
});

// Composite index to prevent logging the same activity twice on the same day
// If problemId is null (for feed), it will only log one feed post per day per user (perfect for heatmap!)
ActivityLogSchema.index({ userId: 1, problemId: 1, dateString: 1 }, { unique: true });

export default mongoose.model("ActivityLog", ActivityLogSchema);