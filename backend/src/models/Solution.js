import mongoose from "mongoose";

const CodeBlockSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, // java, cpp, python
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

  // Hints
  hints: [
    {
      type: String,
      trim: true,
    },
  ],

  myThought: {
    type: String,
    required: true,
  },

  engThought: {
    type: String,
  },

  // ✅ Dynamic languages (ORDERED)
  codeBlocks: {
    type: [CodeBlockSchema],
    default: [],
  },

  youtubeLink: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Solution", SolutionSchema);
