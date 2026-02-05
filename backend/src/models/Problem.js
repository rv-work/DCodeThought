import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  problemNumber: { type: Number, required: true },
  title: { type: String, required: true },

  slug: { type: String, required: true, unique: true },

  leetcodeLink: { type: String, required: true },

  tags: [String],

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },

  isPOTD: { type: Boolean, default: false },
  potdDate: { type: Date },

  isContest: { type: Boolean, default: false },
  contestNumber: Number,
  contestName: String,
  contestDate: Date,

  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Problem", ProblemSchema);
