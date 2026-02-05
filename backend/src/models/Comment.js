import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const CommentSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  text: { type: String, required: true },

  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },

  replies: [ReplySchema],

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", CommentSchema);
