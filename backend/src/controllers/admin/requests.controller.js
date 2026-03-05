import Request from "../../models/Request.js";
import { cacheDel } from "../../services/cache.service.js";


// ---------------- GET ALL ----------------
export const getAllRequestsAdmin = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("createdBy", "name email")
      .sort({ votes: -1 });

    const formatted = requests.map((r) => ({
      ...r.toObject(),
      votes: r.votes.length,
    }));

    return res.json({ success: true, requests: formatted });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to load requests",
    });
  }
};


// ---------------- MARK COMPLETED ----------------
export const markRequestCompleted = async (req, res) => {
  try {
    const { completed } = req.body;

    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    await cacheDel("home:stats");

    return res.json({ success: true, request });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Update failed",
    });
  }
};