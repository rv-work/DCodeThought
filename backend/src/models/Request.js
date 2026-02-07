import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { _id: false }
);

const RequestSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["question", "feature"],
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  votes: [VoteSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Request", RequestSchema);
