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
  const request = await Request.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.json({ success: true, request });
};

export const toggleVote = async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  const userId = req.user._id.toString();
  const exists = request.votes.find(
    (v) => v.userId.toString() === userId
  );

  if (exists) {
    request.votes = request.votes.filter(
      (v) => v.userId.toString() !== userId
    );
  } else {
    request.votes.push({ userId: req.user._id });
  }

  await request.save();
  res.json({ success: true, votes: request.votes.length });
};
