import User from "../models/User.js";
import Report from "../models/Report.js";
import Request from "../models/Request.js";

export const getMyProfile = async (req, res) => {
  try {
    return res.json({ success: true, user: req.user });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch profile",
    });
  }
};

export const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user._id })
      .populate("problemId", "title slug")
      .sort({ createdAt: -1 });

    return res.json({ success: true, reports });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to load reports",
    });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 });

    return res.json({ success: true, requests });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to load your requests",
    });
  }
};

export const getMyRecentProblems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "recentlyViewed.problemId",
      "problemNumber title slug difficulty"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const recent = user.recentlyViewed.filter((r) => r.problemId);

    return res.json({
      success: true,
      recent,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to load recent activity",
    });
  }
};