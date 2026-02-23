import Request from "../../models/Request.js";
import { cacheDel } from "../../services/cache.service.js";


// ---------------- GET ALL ----------------
export const getAllRequestsAdmin = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("createdBy", "name email")
      .sort({ votes: -1 });

    res.json({ success: true, requests });
  } catch {
    res.status(500).json({ message: "Failed to load requests" });
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
      return res.status(404).json({ message: "Request not found" });
    }

    // 🔥 Clear affected public cache
    await cacheDel("home:stats");

    res.json({ success: true, request });
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};