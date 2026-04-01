import ActivityLog from "../models/ActivityLog.js";
import mongoose from "mongoose";

// Get user's activity grouped by date for the Heatmap
export const getUserHeatmap = async (req, res) => {
  try {
    // Agar profile khud ki hai (from auth middleware) ya public username se find kar rahe hain
    // Abhi ke liye hum logged-in user ka maan kar chalte hain
    const userId = req.params.userId || req.user._id;

    // MongoDB Aggregation to group by dateString and count submissions per day
    const heatmapData = await ActivityLog.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$dateString", count: { $sum: 1 } } },
      { $project: { date: "$_id", count: 1, _id: 0 } },
      { $sort: { date: 1 } } // Sort chronologically
    ]);

    res.status(200).json({
      success: true,
      heatmap: heatmapData, // Returns array like [{ date: "2026-03-18", count: 2 }, ...]
    });
  } catch (error) {
    console.error("Error fetching heatmap:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};