import Problem from "../models/Problem.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";


// ---------------- TODAY ----------------
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const potd = await Problem.findOne({
      type: "potd",
      potdDate: today,
    })
      .select("problemNumber title slug difficulty tags potdDate")
      .lean();

    // Even if null, cache it to avoid repeated DB hits
    await cacheSet(cacheKey, potd, 86400); // 24h

    res.json({ success: true, potd });
  } catch (err) {
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

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const regex = new RegExp(search, "i");

    const query = {
      type: "potd",
      $or: [
        { title: regex },
        { problemNumber: Number(search) || -1 },
      ],
    };

    const cacheKey = `potd:history:${pageNum}:${limitNum}:${search || ""}`;
    const cached = await cacheGet(cacheKey);

    if (cached) {
      console.log("⚡ getPotdHistory → Redis HIT");
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }

    console.log("🗄️ getPotdHistory → MongoDB MISS");
    res.set("X-Cache", "MISS");

    const [potds, total] = await Promise.all([
      Problem.find(query)
        .sort({ potdDate: -1 })
        .skip(skip)
        .limit(limitNum)
        .select("problemNumber title slug difficulty tags potdDate")
        .lean(),
      Problem.countDocuments(query),
    ]);

    const payload = {
      success: true,
      potds,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    };

    await cacheSet(cacheKey, payload, 3600); // 1 hour

    res.json(payload);
  } catch (err) {
    res.status(500).json({ message: "Failed to load POTD history" });
  }
};