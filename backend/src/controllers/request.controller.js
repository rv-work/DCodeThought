import Request from "../models/Request.js";

export const getAllRequestsPublic = async (req, res) => {
  const requests = await Request.find()
    .sort({ votes: -1 })
    .select("-createdBy");
  res.json({ success: true, requests });
};

export const addRequest = async (req, res) => {
  const request = await Request.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.json({ success: true, request });
};

export const voteRequest = async (req, res) => {
  const { action } = req.body;

  const inc = action === "up" ? 1 : -1;

  const request = await Request.findByIdAndUpdate(
    req.params.id,
    { $inc: { votes: inc } },
    { new: true }
  );

  res.json({ success: true, votes: request.votes });
};
