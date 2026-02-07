import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  problemNumber: {
    type: Number,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  leetcodeLink: {
    type: String,
    required: true,
  },

  tags: [String],

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },

  // ✅ MAIN TYPE (NEW)
  type: {
    type: String,
    enum: ["potd", "contest", "requested"],
    required: true,
  },

  // -------- POTD FIELDS --------
  potdDate: {
    type: Date,
  },

  // -------- CONTEST FIELDS --------
  contestNumber: {
    type: Number,
  },

  contestName: {
    type: String,
  },

  contestDate: {
    type: Date,
  },

  // -------- REQUESTED META --------
  requestedFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
  },

  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Problem", ProblemSchema);
