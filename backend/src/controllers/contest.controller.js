import Contest from "../models/Contest.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

// -------- LIST --------
export const getPublicContests = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const cacheKey = `contests:list:${page}:${limit}`;
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return res.json({ fromCache: true, ...cached });
    }

    const [contests, total] = await Promise.all([
      Contest.find()
        .sort({ contestNumber: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select("contestNumber contestName contestDate"),
      Contest.countDocuments(),
    ]);

    const payload = {
      success: true,
      contests,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    };

    await cacheSet(cacheKey, payload, 3600); // 1h
    res.json(payload);
  } catch {
    res.status(500).json({ message: "Failed to load contests" });
  }
};

// -------- DETAIL --------
export const getContestDetail = async (req, res) => {
  try {
    const { contestNumber } = req.params;

    const cacheKey = `contest:${contestNumber}`;
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return res.json({ fromCache: true, contest: cached });
    }

    const contest = await Contest.findOne({
      contestNumber: Number(contestNumber),
    }).populate(
      "problems",
      "problemNumber title slug difficulty tags"
    );

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    await cacheSet(cacheKey, contest, 3600);
    res.json({ success: true, contest });
  } catch {
    res.status(500).json({ message: "Failed to load contest" });
  }
};
