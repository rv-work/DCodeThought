import User from "../../models/User.js";
import Problem from "../../models/Problem.js";
import Solution from "../../models/Solution.js";
import Contest from "../../models/Contest.js";
import Report from "../../models/Report.js";
import Request from "../../models/Request.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProblems,
      totalSolutions,
      totalContests,
      recentReports,
      pendingRequests,
    ] = await Promise.all([
      User.countDocuments(),
      Problem.countDocuments(),
      Solution.countDocuments(),
      Contest.countDocuments(),

      Report.find({ resolved: false })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title createdAt"),

      Request.find({
        type: "question",
        completed: false,
        $expr: {
          $gte: [{ $size: "$votes" }, 50],
        },
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title votes"),
    ]);

    res.json({
      success: true,
      stats: {
        users: totalUsers,
        problems: totalProblems,
        solutions: totalSolutions,
        contests: totalContests,
      },
      recentReports,
      pendingRequests,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Dashboard load failed" });
  }
};
