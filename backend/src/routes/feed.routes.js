import express from "express";
import { protect } from "../middleware/auth.js";
import { uploadMiddleware } from "../middleware/upload.middleware.js";
import { addComment, createPost, deleteComment, deletePost, editPost, getFeed, toggleLike } from "../controllers/feed.controller.js";

const router = express.Router();

// GET all feed posts (Public or Protected, your choice. Keeping public to read, protected to write)
router.get("/", getFeed);

// POST create a new feed post (Max 4 images allowed)
router.post("/", protect, uploadMiddleware.array("images", 4), createPost);

router.delete("/:id", protect, deletePost);
router.put("/:id", protect, editPost);

// PUT toggle like on a post
router.put("/:id/like", protect, toggleLike);

// POST add a comment
router.post("/:id/comment", protect, addComment);

// DELETE remove a comment
router.delete("/:id/comment/:commentId", protect, deleteComment);

export default router;