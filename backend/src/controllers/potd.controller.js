import Problem from "../models/Problem.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

// ---------------- TODAY ----------------
export const getTodayPotd = async (req, res) => {
  try {
    const cacheKey = "potd:today";
    const cached = await cacheGet(cacheKey);

    if (cached) {
      return res.json({ fromCache: true, potd: cached });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const potd = await Problem.findOne({
      type: "potd",
      potdDate: today,
    }).select("problemNumber title slug difficulty tags potdDate");

    await cacheSet(cacheKey, potd, 86400); // 24h

    res.json({ success: true, potd });
  } catch {
    res.status(500).json({ message: "Failed to load POTD" });
  }
};

// ---------------- HISTORY ----------------
export const getPotdHistory = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
    } = req.query;

    const skip = (page - 1) * limit;
    const regex = new RegExp(search, "i");

    const query = {
      type: "potd",
      $or: [
        { title: regex },
        { problemNumber: Number(search) || -1 },
      ],
    };

    const cacheKey = `potd:history:${page}:${limit}:${search}`;
    const cached = await cacheGet(cacheKey);

    if (cached) {
      return res.json({ fromCache: true, ...cached });
    }

    const [potds, total] = await Promise.all([
      Problem.find(query)
        .sort({ potdDate: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select("problemNumber title slug difficulty tags potdDate"),
      Problem.countDocuments(query),
    ]);

    const payload = {
      success: true,
      potds,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    };

    await cacheSet(cacheKey, payload, 3600); // 1h

    res.json(payload);
  } catch {
    res.status(500).json({ message: "Failed to load POTD history" });
  }
};
