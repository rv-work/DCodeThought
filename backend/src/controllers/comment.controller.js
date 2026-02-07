import Comment from "../models/Comment.js";
import Problem from "../models/Problem.js";

const applyVote = (votes, userId, value) => {
  const existing = votes.find(v => v.userId.toString() === userId.toString());
  if (existing) {
    if (existing.value === value) {
      return votes.filter(v => v.userId.toString() !== userId.toString());
    }
    existing.value = value;
    return votes;
  }
  return [...votes, { userId, value }];
};

export const getCommentsByProblemSlug = async (req, res) => {
  const problem = await Problem.findOne({ slug: req.params.slug });
  if (!problem) return res.json({ success: true, comments: [] });

  const comments = await Comment.find({ problemId: problem._id })
    .populate("userId", "name")
    .populate("replies.userId", "name")
    .sort({ createdAt: -1 });

  res.json({ success: true, comments });
};

export const addComment = async (req, res) => {
  const problem = await Problem.findOne({ slug: req.params.slug });
  if (!problem) return res.status(404).json({ message: "Problem not found" });

  const comment = await Comment.create({
    problemId: problem._id,
    userId: req.user._id,
    text: req.body.text,
  });

  res.json({ success: true, comment });
};

export const addReply = async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  comment.replies.push({
    userId: req.user._id,
    text: req.body.text,
  });

  await comment.save();
  res.json({ success: true });
};

export const voteComment = async (req, res) => {
  const value = req.body.value === "up" ? 1 : -1;
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  comment.votes = applyVote(comment.votes, req.user._id, value);
  await comment.save();

  res.json({ success: true });
};

export const voteReply = async (req, res) => {
  const value = req.body.value === "up" ? 1 : -1;
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  const reply = comment.replies.id(req.params.replyId);
  if (!reply) return res.status(404).json({ message: "Reply not found" });

  reply.votes = applyVote(reply.votes, req.user._id, value);
  await comment.save();

  res.json({ success: true });
};
