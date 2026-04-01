import mongoose from "mongoose";

const feedPostSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    questionNumber: { 
      type: Number, 
      required: true 
    },
    title: { 
      type: String, 
      required: true,
      trim: true
    },
    leetcodeLink: { 
      type: String, 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    images: [{ 
      type: String // Cloudinary URLs store honge yahan
    }],
    tags: [{ 
      type: String 
    }],
    likes: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }],
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

const FeedPost = mongoose.model("FeedPost", feedPostSchema);
export default FeedPost;