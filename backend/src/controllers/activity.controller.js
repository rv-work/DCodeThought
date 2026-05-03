import ActivityLog from "../models/ActivityLog.js";
import mongoose from "mongoose";
import Problem from "../models/Problem.js"; 
import User from "../models/User.js"; 
import { checkAnyRecentSubmission, verifyLeetCodeSubmission } from "../utils/leetcodeVerifier.js";
import { updateStreakAndLogActivity } from "../utils/streakManager.js";

export const getUserHeatmap = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;

    const heatmapData = await ActivityLog.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$dateString", count: { $sum: "$count" } } }, // 🔥 Cleaned!
      { $project: { date: "$_id", count: 1, _id: 0 } },
      { $sort: { date: 1 } }
    ]);

    res.status(200).json({ success: true, heatmap: heatmapData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};






export const verifyProblemSync = async (req, res) => {
  try {
    const { problemId } = req.body;
    const userId = req.user._id;

    // 1. Get Problem & User Details
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ success: false, message: "Problem not found" });

    const user = await User.findById(userId);
    const leetcodeHandle = user.socialLinks?.leetcode;

    if (!leetcodeHandle) {
      return res.status(400).json({ 
        success: false, 
        message: "Please add your LeetCode username in your Profile settings first!" 
      });
    }

    // 2. Call GraphQL Verifier
    // (Assuming problem.slug exists and matches LeetCode's slug exactly)
    const isVerified = await verifyLeetCodeSubmission(leetcodeHandle, problem.slug);

    if (!isVerified) {
      return res.status(400).json({ 
        success: false, 
        message: "No recent accepted submission found on LeetCode. Ensure your profile is public and try again after a minute." 
      });
    }

    // 3. Update Streak & Log Activity!
    const result = await updateStreakAndLogActivity(userId, problemId, problem.type || "practice");

    return res.status(200).json({ 
      success: true, 
      message: "Verified successfully! Streak updated. ✅",
      newStreak: result?.newStreak
    });

  } catch (error) {
    console.error("Sync Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};





export const syncMyDay = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const leetcodeHandle = user.socialLinks?.leetcode;

    if (!leetcodeHandle) {
      return res.status(400).json({ success: false, message: "LeetCode not linked." });
    }

    // 1. Fetch from LeetCode
    const recentData = await checkAnyRecentSubmission(leetcodeHandle);

    if (!recentData) {
      return res.status(400).json({ 
        success: false, 
        // 🔥 Yahan message change kar diya "TODAY" ke liye
        message: "No accepted submissions found on LeetCode for TODAY. Go solve something!" 
      });
    }

    // 2. Update Streak & Log Activity with solve count
    const result = await updateStreakAndLogActivity(
      userId, 
      null, 
      "practice", 
      recentData.count 
    );

    return res.status(200).json({ 
      success: true, 
      message: `Synced ${recentData.count} problem(s)! Last solved: ${recentData.latestProblem.title} 🔥`,
      newStreak: result?.newStreak
    });

  // 🔥 Catch block add kar diya
  } catch (error) {
    console.error("Sync My Day Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};