import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: false }, 
  dateString: { type: String, required: true }, 
  type: { type: String, enum: ["potd", "contest", "practice", "feed"], required: true },
  count: { type: Number, default: 1 }, // 🔥 YEH NAYA FIELD HAI
  createdAt: { type: Date, default: Date.now }
});

ActivityLogSchema.index({ userId: 1, problemId: 1, dateString: 1 }, { unique: true });

export default mongoose.model("ActivityLog", ActivityLogSchema);