import Comment from "../models/Comment.js";
import Problem from "../models/Problem.js";

// ------------------------- ADD COMMENT -------------------------
export const addComment = async (req, res) => {
  try {
    const { problemId, text } = req.body;

    const exists = await Problem.findById(problemId);
    if (!exists) return res.status(404).json({ message: "Problem not found" });

    const comment = await Comment.create({
      problemId,
      userId: req.user._id,
      text,
    });

    res.json({ success: true, comment });
  } catch (err) {
    res.status(500).json({ message: "Add comment failed" });
  }
};

// ------------------------- GET COMMENTS -------------------------
export const getComments = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { sort = "newest" } = req.query;

    let sortQuery = {};

    if (sort === "newest") sortQuery = { createdAt: -1 };
    else if (sort === "oldest") sortQuery = { createdAt: 1 };
    else if (sort === "most-liked") sortQuery = { likes: -1 };

    const comments = await Comment.find({ problemId })
      .populate("userId", "name")
      .sort(sortQuery);

    res.json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ message: "Failed to load comments" });
  }
};

// ------------------------- ADD REPLY -------------------------
export const addReply = async (req, res) => {
  try {
    const { commentId, text } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.unshift({
      userId: req.user._id,
      text,
    });

    await comment.save();

    res.json({ success: true, comment });
  } catch (err) {
    res.status(500).json({ message: "Reply failed" });
  }
};

// ------------------------- LIKE COMMENT -------------------------
export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.likes += 1;
    await comment.save();

    res.json({ success: true, likes: comment.likes });
  } catch (err) {
    res.status(500).json({ message: "Like failed" });
  }
};

// ------------------------- DISLIKE COMMENT -------------------------
export const dislikeComment = async (req, res) => {
  try {
    const { commentId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.dislikes += 1;
    await comment.save();

    res.json({ success: true, dislikes: comment.dislikes });
  } catch (err) {
    res.status(500).json({ message: "Dislike failed" });
  }
};
