import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String }, // for email login

  googleId: { type: String }, // for Google login

  // models/User.js ke andar
  username: {
    type: String,
    unique: true,
    sparse: true, // sparse isliye taaki purane users jinka username nahi hai, unhe error na aaye
    trim: true,
    lowercase: true,
  },
  bio: {
    type: String,
    maxLength: 160,
    default: "",
  },
  socialLinks: {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    leetcode: { type: String, default: "" },
  },

  leetcodeRating: { type: Number, default: 0 },

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

  college: {
    type: String,
    trim: true,
    default: null,
  },

  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],

  streaks: {
    currentGeneral: { type: Number, default: 0 },
    maxGeneral: { type: Number, default: 0 },
    currentPotd: { type: Number, default: 0 },
    maxPotd: { type: Number, default: 0 },
    currentContest: { type: Number, default: 0 }, 
    maxContest: { type: Number, default: 0 },
    
    lastActivityDate: { type: Date, default: null },
    lastPotdDate: { type: Date, default: null },
    lastContestDate: { type: Date, default: null }, 
  },

  challenge: {
    activeDays: { type: Number, default: null }, 
    title: { type: String, default: null },     
    desc: { type: String, default: null },      
    startDate: { type: Date, default: null },
    progress: { type: Number, default: 0 },
  },

  reputation: {
    helpful: { type: Number, default: 0 },
    simplest: { type: Number, default: 0 },
    creative: { type: Number, default: 0 },
    totalThinkerScore: { type: Number, default: 0 }, 
  },

  badges: [{
    type: String,
    enum: ["30_Days", "50_Days", "100_Days", "200_Days", "365_Days", "Top_Thinker"],
  }],

  mentor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    default: null 
  },
});

export default mongoose.model("User", UserSchema);