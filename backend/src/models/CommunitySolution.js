import mongoose from "mongoose";

const TagRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tagType: { type: String, enum: ["helpful", "simplest", "creative"], required: true }
}, { _id: false });

const CommunitySolutionSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // Content
  approach: { type: String, required: true },
  explanation: { type: String, required: true },
  code: { type: String }, // Optional as per your rules
  language: { type: String },

  // Tags/Votes Counters (For fast sorting: e.g., Best Thinker Solution)
  tagCounts: {
    helpful: { type: Number, default: 0 },
    simplest: { type: Number, default: 0 },
    creative: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 } // helpful + simplest + creative
  },

  // To track who tagged what and prevent duplicate voting (spam control)
  taggedBy: [TagRecordSchema],

  createdAt: { type: Date, default: Date.now },
});

// Index for faster queries when loading a problem's community solutions
CommunitySolutionSchema.index({ problemId: 1, "tagCounts.totalScore": -1 });

export default mongoose.model("CommunitySolution", CommunitySolutionSchema);