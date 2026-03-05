import Request from "../models/Request.js";

export const getPublicRequests = async (req, res) => {
  const { type } = req.query;

  const filter = type ? { type } : {};

  const requests = await Request.find(filter)
    .populate("createdBy", "name")
    .sort({ votes: -1, createdAt: -1 });

  res.json({ success: true, requests });
};




export const addRequest = async (req, res) => {
  try {
    const request = await Request.create({
      ...req.body,
      createdBy: req.user._id,
    });

    return res.json({ success: true, request });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Could not create request",
    });
  }
};




export const toggleVote = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const userId = req.user._id.toString();
    const exists = request.votes.find((v) => v.userId.toString() === userId);

    if (exists) {
      request.votes = request.votes.filter(
        (v) => v.userId.toString() !== userId
      );
    } else {
      request.votes.push({ userId: req.user._id });
    }

    await request.save();

    return res.json({
      success: true,
      votes: request.votes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to toggle vote",
    });
  }
};