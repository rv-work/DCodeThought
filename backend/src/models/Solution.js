// models/Solution.js
import mongoose from "mongoose";

const CodeBlockSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const SolutionSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },

  hints: [{ type: String, trim: true }],

  myThought: {
    type: String,
    required: true,
  },

  engThought: String,

  // 👇 DB shape
  codeBlocks: {
    type: [CodeBlockSchema],
    default: [],
  },

  youtubeLink: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Solution", SolutionSchema);
