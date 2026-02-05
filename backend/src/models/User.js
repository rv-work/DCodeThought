import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String }, // for email login

  googleId: { type: String }, // for Google login

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  dateOfJoining: {
    type: Date,
    default: Date.now,
  },

  recentlyViewed: [
    {
      problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
      viewedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("User", UserSchema);
