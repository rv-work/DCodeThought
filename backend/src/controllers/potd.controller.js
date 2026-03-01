import Potd from "../models/Potd.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

export const getTodayPotd = async (req, res) => {
  try {
    const cacheKey = "potd:today";
    const cached = await cacheGet(cacheKey);

    if (cached) {
      console.log("⚡ getTodayPotd → Redis HIT");
      res.set("X-Cache", "HIT");
      return res.json({ success: true, potd: cached });
    }

    console.log("🗄️ getTodayPotd → MongoDB MISS");
    res.set("X-Cache", "MISS");

    // Normalize today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch from Potd collection
    const potdEntry = await Potd.findOne({ date: today })
      .populate("problem", "problemNumber title slug difficulty tags")
      .lean();

    const potd = potdEntry ? potdEntry.problem : null;

    // Cache for 24 hours
    await cacheSet(cacheKey, potd, 86400);

    res.json({ success: true, potd });
  } catch (err) {
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
      console.log("⚡ getPotdHistory → Redis HIT");
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }

    console.log("🗄️ getPotdHistory → MongoDB MISS");
    res.set("X-Cache", "MISS");

    const potdsRaw = await Potd.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate("problem", "problemNumber title slug difficulty tags")
      .lean();

    const total = await Potd.countDocuments();

    // FE ko expected shape me convert
    const potds = potdsRaw.map((p) => ({
      ...p.problem,
      potdDate: p.date,
    }));

    const payload = {
      success: true,
      potds,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    };

    // Cache for 1 hour
    await cacheSet(cacheKey, payload, 3600);

    res.json(payload);
  } catch (err) {
    res.status(500).json({ message: "Failed to load POTD history" });
  }
};