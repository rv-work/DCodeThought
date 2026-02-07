import User from "../../models/User.js";
import Problem from "../../models/Problem.js";
import Report from "../../models/Report.js";
import Request from "../../models/Request.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProblems,
      recentReports,
      pendingRequests,
    ] = await Promise.all([
      User.countDocuments(),
      Problem.countDocuments(),
      Report.find({ resolved: false })
        .sort({ createdAt: -1 })
        .limit(5),
      Request.find({
        type: "question",
        votes: { $gte: 50 },
        completed: false,
      }).sort({ votes: -1 }),
    ]);

    res.json({
      success: true,
      stats: {
        users: totalUsers,
        problems: totalProblems,
      },
      recentReports,
      pendingRequests,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard load failed" });
  }
};
