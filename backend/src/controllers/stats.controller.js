import User from "../models/User.js";
import Problem from "../models/Problem.js";
import Solution from "../models/Solution.js";
import Contest from "../models/Contest.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

export const getPlatformStats = async (req, res) => {
  try {
    const cacheKey = "platform:stats";
    const cached = await cacheGet(cacheKey);

    if (cached) return res.json({ fromCache: true, ...cached });

    const totalUsers = await User.countDocuments();
    const totalProblems = await Problem.countDocuments();
    const totalSolutions = await Solution.countDocuments();
    const totalContests = await Contest.countDocuments();
    const totalPOTD = await Problem.countDocuments({ isPOTD: true });

    const stats = {
      totalUsers,
      totalProblems,
      totalSolutions,
      totalContests,
      totalPOTD,
    };

    // Cache for 1 hour
    await cacheSet(cacheKey, stats, 3600);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Stats loading failed" });
  }
};
