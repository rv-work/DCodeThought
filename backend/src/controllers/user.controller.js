import User from "../models/User.js";
import Report from "../models/Report.js";
import Request from "../models/Request.js";

// -------- BASIC PROFILE --------
export const getMyProfile = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

// -------- MY REPORTS --------
export const getMyReports = async (req, res) => {
  const reports = await Report.find({ userId: req.user._id })
    .populate("problemId", "title slug")
    .sort({ createdAt: -1 });

  res.json({ success: true, reports });
};

// -------- MY REQUESTS --------
export const getMyRequests = async (req, res) => {
  const requests = await Request.find({ createdBy: req.user._id })
    .sort({ createdAt: -1 });

  res.json({ success: true, requests });
};

// -------- RECENTLY VIEWED --------
export const getMyRecentProblems = async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "recentlyViewed.problemId",
    "problemNumber title slug difficulty"
  );

  res.json({
    success: true,
    recent: user.recentlyViewed,
  });
};
