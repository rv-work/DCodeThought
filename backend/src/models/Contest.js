import mongoose from "mongoose";

const ContestSchema = new mongoose.Schema({
  contestNumber: { type: Number, required: true },
  contestName: { type: String, required: true },
  contestDate: Date,

  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Contest", ContestSchema);
