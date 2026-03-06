import Potd from "../models/Potd.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

export const getTodayPotd = async (req, res) => {
  try {
    // 1. Aaj aur Kal ki exact local boundaries nikalo
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // 2. Date-specific cache key banao (e.g., "potd:today:2026-03-06")
    // Isse kal ka cache aaj interfere nahi karega
    const dateString = todayStart.toISOString().split("T")[0];
    const cacheKey = `potd:today:${dateString}`;

    const cached = await cacheGet(cacheKey);

    if (cached) {
      console.log("⚡ getTodayPotd → Redis HIT");
      res.set("X-Cache", "HIT");
      return res.json({ success: true, potd: cached });
    }

    console.log("🗄️ getTodayPotd → MongoDB MISS");
    res.set("X-Cache", "MISS");

    // 3. Exact equality ki jagah Range query ($gte, $lt) use karo 
    // Taaki Timezone differences ki wajah se miss na ho
    const potdEntry = await Potd.findOne({
      date: { $gte: todayStart, $lt: tomorrowStart }
    })
      .populate("problem", "problemNumber title slug difficulty tags")
      .lean();

    let potd = null;
    
    // 4. FIX: Frontend ko 'potdDate' chahiye tha jo missing tha!
    if (potdEntry && potdEntry.problem) {
      potd = {
        ...potdEntry.problem,
        potdDate: potdEntry.date, // Ab frontend ko Invalid Date nahi aayega
      };
    }

    // 5. Dynamic Cache TTL: Cache ko theek raat 12 baje expire karo, na ki 24 ghante baad
    const msUntilMidnight = tomorrowStart.getTime() - now.getTime();
    const ttlSeconds = Math.ceil(msUntilMidnight / 1000);

    await cacheSet(cacheKey, potd, ttlSeconds);

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

    // Mapping is correct here
    const potds = potdsRaw
      .filter(p => p.problem) // Extra safety check
      .map((p) => ({
        ...p.problem,
        potdDate: p.date,
      }));

    const payload = {
      success: true,
      potds,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    };

    await cacheSet(cacheKey, payload, 3600);

    res.json(payload);
  } catch (err) {
    res.status(500).json({ message: "Failed to load POTD history" });
  }
};