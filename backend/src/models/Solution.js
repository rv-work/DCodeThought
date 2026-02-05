import mongoose from "mongoose";

const SolutionSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },

  myThought: { type: String, required: true },

  engThought: { type: String },

  code: {
    java: String,
    cpp: String,
    python: String,
    js: String,
  },

  youtubeLink: String,

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Solution", SolutionSchema);
