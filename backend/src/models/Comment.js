import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    value: { type: Number, enum: [1, -1], required: true },
  },
  { _id: false }
);

const ReplySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  votes: [VoteSchema],
  createdAt: { type: Date, default: Date.now },
});

const CommentSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  votes: [VoteSchema],
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", CommentSchema);
