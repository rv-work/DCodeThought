import Potd from "../models/Potd.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

export const getTodayPotd = async (req, res) => {
  try {
    const cacheKey = "potd:today";
    const cached = await cacheGet(cacheKey);

    if (cached) {
      return res.json({ fromCache: true, potd: cached });
    }

    // ✅ Timezone-safe range
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const potdDoc = await Potd.findOne({
      date: { $gte: start, $lte: end },
    })
      .populate(
        "problem",
        "problemNumber title slug difficulty tags"
      )
      .lean();

    if (!potdDoc) {
      return res.json({ success: true, potd: null });
    }

    const payload = {
      ...potdDoc.problem,
      potdDate: potdDoc.date,
    };

    await cacheSet(cacheKey, payload, 86400);

    res.json({ success: true, potd: payload });
  } catch {
    res.status(500).json({ message: "Failed to load POTD" });
  }
};

export const getPotdHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const cacheKey = `potd:history:${pageNum}:${limitNum}`;
    const cached = await cacheGet(cacheKey);

    if (cached) {
      return res.json({ fromCache: true, ...cached });
    }

    const [docs, total] = await Promise.all([
      Potd.find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate(
          "problem",
          "problemNumber title slug difficulty tags"
        )
        .lean(),
      Potd.countDocuments(),
    ]);

    const potds = docs.map((doc) => ({
      ...doc.problem,
      potdDate: doc.date,
    }));

    const payload = {
      success: true,
      potds,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    };

    await cacheSet(cacheKey, payload, 3600);

    res.json(payload);
  } catch {
    res.status(500).json({ message: "Failed to load POTD history" });
  }
};