import Contest from "../models/Contest.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";


// -------- LIST --------
export const getPublicContests = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const cacheKey = `contests:list:${pageNum}:${limitNum}`;
    const cached = await cacheGet(cacheKey);

    if (cached) {
      console.log("⚡ getPublicContests → Redis HIT");
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }

    console.log("🗄️ getPublicContests → MongoDB MISS");
    res.set("X-Cache", "MISS");

    const [contests, total] = await Promise.all([
      Contest.find()
        .sort({ contestNumber: -1 })
        .skip(skip)
        .limit(limitNum)
        .select("contestNumber contestName contestDate")
        .lean(),
      Contest.countDocuments(),
    ]);

    const payload = {
      success: true,
      contests,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    };

    await cacheSet(cacheKey, payload, 3600); // 1 hour

    res.json(payload);
  } catch (err) {
    res.status(500).json({ message: "Failed to load contests" });
  }
};



// -------- DETAIL --------
export const getContestDetail = async (req, res) => {
  try {
    const { contestNumber } = req.params;
    const contestNum = Number(contestNumber);

    const cacheKey = `contest:${contestNum}`;
    const cached = await cacheGet(cacheKey);

    if (cached) {
      console.log("⚡ getContestDetail → Redis HIT");
      res.set("X-Cache", "HIT");
      return res.json({ success: true, contest: cached });
    }

    console.log("🗄️ getContestDetail → MongoDB MISS");
    res.set("X-Cache", "MISS");

    const contest = await Contest.findOne({
      contestNumber: contestNum,
    })
      .populate(
        "problems",
        "problemNumber title slug difficulty tags"
      )
      .lean();

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    await cacheSet(cacheKey, contest, 3600);

    res.json({ success: true, contest });
  } catch (err) {
    res.status(500).json({ message: "Failed to load contest" });
  }
};