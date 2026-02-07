import Problem from "../models/Problem.js";
import Contest from "../models/Contest.js";
import Request from "../models/Request.js";
import Report from "../models/Report.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

export const getHomeStats = async (req, res) => {
  try {
    const cacheKey = "home:stats";
    const cached = await cacheGet(cacheKey);

    if (cached) {
      return res.json({ fromCache: true, stats: cached });
    }

    const [
      totalProblems,
      totalPotds,
      totalContests,
      resolvedReports,
      completedRequests,
    ] = await Promise.all([
      Problem.countDocuments(),
      Problem.countDocuments({ type: "potd" }),
      Contest.countDocuments(),
      Report.countDocuments({ resolved: true }),
      Request.countDocuments({ completed: true }),
    ]);

    const stats = {
      totalProblems,
      totalPotds,
      totalContests,
      resolvedReports,
      completedRequests,
    };

    await cacheSet(cacheKey, stats, 3600); // 1 hour

    res.json({ success: true, stats });
  } catch {
    res.status(500).json({ message: "Failed to load home stats" });
  }
};
