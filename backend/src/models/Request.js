import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["feature", "question"],
    required: true,
  },

  title: { type: String, required: true },
  description: { type: String, required: true },

  votes: { type: Number, default: 0 },

  completed: { type: Boolean, default: false },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Request", RequestSchema);
