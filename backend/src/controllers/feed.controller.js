import FeedPost from "../models/FeedPost.js";
import { updateStreakAndLogActivity } from "../utils/streakManager.js"; 

export const createPost = async (req, res) => {
  try {
    const { questionNumber, title, leetcodeLink, content, tags } = req.body;
    const userId = req.user._id;

    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    let parsedTags = [];
    if (tags) {
      parsedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    }

    const newPost = await FeedPost.create({
      userId,
      questionNumber,
      title,
      leetcodeLink,
      content,
      images: imageUrls,
      tags: parsedTags
    });

    await newPost.populate("userId", "name username college badges");

    await updateStreakAndLogActivity(userId, null, "feed");

    res.status(201).json({ success: true, message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// 6. Delete a Post (Only Owner)
export const deletePost = async (req, res) => {
  try {
    const post = await FeedPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });

    // Authorization Check
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this post." });
    }

    await post.deleteOne();
    res.status(200).json({ success: true, message: "Post deleted successfully." });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 7. Edit a Post (Only text/links, keeping image editing complex logic out for V1)
export const editPost = async (req, res) => {
  try {
    const { title, leetcodeLink, content, tags } = req.body;
    const post = await FeedPost.findById(req.params.id);
    
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });

    // Authorization Check
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to edit this post." });
    }

    // Update fields
    if (title) post.title = title;
    if (leetcodeLink) post.leetcodeLink = leetcodeLink;
    if (content) post.content = content;
    if (tags) {
      post.tags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    }

    await post.save();
    
    // Populate user info so frontend updates seamlessly
    await post.populate("userId", "name username college badges");
    await post.populate("comments.userId", "name username badges");

    res.status(200).json({ success: true, message: "Post updated successfully.", post });
  } catch (error) {
    console.error("Edit Post Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 2. Get Feed Posts (with Pagination)
// controllers/feed.controller.js

export const getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await FeedPost.find()
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit)
      .populate("userId", "name username college badges") // Yeh post ke author ke liye hai
      .populate("comments.userId", "name username badges"); // 👇 FIX: Yeh comments ke authors ke liye hai!

    const totalPosts = await FeedPost.countDocuments();

    res.status(200).json({
      success: true,
      posts,
      hasMore: skip + posts.length < totalPosts
    });
  } catch (error) {
    console.error("Get Feed Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 3. Toggle Like on a Post
export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await FeedPost.findById(id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({ success: true, isLiked: !isLiked, likesCount: post.likes.length });
  } catch (error) {
    console.error("Toggle Like Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// 4. Add a Comment to a Post
// controllers/feed.controller.js

export const addComment = async (req, res) => {
  try {
    const { id } = req.params; // Post ID
    const { text } = req.body;
    const userId = req.user._id;

    if (!text || text.trim() === "") {
      return res.status(400).json({ success: false, message: "Comment text is required." });
    }

    const post = await FeedPost.findById(id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });

    const newComment = {
      userId,
      text: text.trim(),
      createdAt: new Date()
    };

    // 1. Naya comment array me push karke save kiya
    post.comments.push(newComment);
    await post.save();

    // 👇 2. BULLETPROOF FIX: Post ko wapas fetch karo aur comments ke userId ko populate karo
    const populatedPost = await FeedPost.findById(id).populate("comments.userId", "name username badges");

    res.status(201).json({ 
      success: true, 
      message: "Comment added!", 
      comments: populatedPost.comments // Ab isme naye comment ka name/username sab hoga!
    });
  } catch (error) {
    console.error("Add Comment Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 5. Delete a Comment
export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const userId = req.user._id;

    const post = await FeedPost.findById(id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });

    // Find the specific comment
    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found." });

    // Authorization: Only the person who wrote the comment OR the owner of the post can delete it
    if (comment.userId.toString() !== userId.toString() && post.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this comment." });
    }

    // Remove the comment safely
    comment.deleteOne();
    await post.save();

    res.status(200).json({ 
      success: true, 
      message: "Comment deleted!", 
      commentId 
    });
  } catch (error) {
    console.error("Delete Comment Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};