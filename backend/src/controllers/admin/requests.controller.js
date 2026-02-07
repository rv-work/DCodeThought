import Request from "../../models/Request.js";

export const getAllRequestsAdmin = async (req, res) => {
  const requests = await Request.find()
    .populate("createdBy", "name email")
    .sort({ votes: -1 });

  res.json({ success: true, requests });
};

export const markRequestCompleted = async (req, res) => {
  const { completed } = req.body;

  const request = await Request.findByIdAndUpdate(
    req.params.id,
    { completed },
    { new: true }
  );

  res.json({ success: true, request });
};
