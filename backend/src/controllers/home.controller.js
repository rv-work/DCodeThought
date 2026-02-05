import Problem from "../models/Problem.js";
import Contest from "../models/Contest.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

export const getHomeData = async (req, res) => {
  try {
    // Redis cache check
    const cacheKey = "home:data";
    const cached = await cacheGet(cacheKey);

    if (cached) return res.json({ fromCache: true, ...cached });

    // Today's POTD
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayPOTD = await Problem.findOne({
      isPOTD: true,
      potdDate: today,
    }).select("title problemNumber difficulty slug");

    // Last 7 POTDs
    const recentPOTDs = await Problem.find({
      isPOTD: true,
      potdDate: { $lt: today },
    })
      .sort({ potdDate: -1 })
      .limit(7)
      .select("title problemNumber difficulty potdDate slug");

    // Latest Contests
    const latestContests = await Contest.find()
      .sort({ contestNumber: -1 })
      .limit(3)
      .select("contestName contestNumber contestDate problems");

    // Trending problems (V1 → most recent ones)
    const trendingProblems = await Problem.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .select("title problemNumber difficulty tags slug");

    const result = {
      todayPOTD,
      recentPOTDs,
      latestContests,
      trendingProblems,
    };

    // Store cache for 30 minutes
    await cacheSet(cacheKey, result, 1800);

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Failed to load home data" });
  }
};
