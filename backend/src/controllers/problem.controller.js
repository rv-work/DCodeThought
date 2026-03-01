import Problem from "../models/Problem.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

export const getPublicProblems = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = "",
      difficulty,
      type,
      sort = "newest",
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const query = {};

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { title: regex },
        { problemNumber: Number(search) || -1 },
      ];
    }

    if (difficulty) query.difficulty = difficulty;
    if (type) query.type = type;

    const sortQuery =
      sort === "oldest" ? { addedAt: 1 } : { addedAt: -1 };

    const cacheKey = `problems:${pageNum}:${limitNum}:${search || ""}:${difficulty || ""}:${type || ""}:${sort}`;

    const cached = await cacheGet(cacheKey);

    if (cached) {
      console.log("⚡ getPublicProblems → Redis HIT");
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }

    console.log("🗄️ getPublicProblems → MongoDB MISS");
    res.set("X-Cache", "MISS");

    const [problems, total] = await Promise.all([
      Problem.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limitNum)
        .select("problemNumber title difficulty slug type tags addedAt")
        .lean(),
      Problem.countDocuments(query),
    ]);

    const payload = {
      success: true,
      problems,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    };

    await cacheSet(cacheKey, payload, 3600);

    res.json(payload);
  } catch (err) {
    res.status(500).json({ message: "Failed to load problems" });
  }
};



export const getProblemDetail = async (req, res) => {
  try {
    const { slug } = req.params;

    const cacheKey = `problem:slug:${slug}`;
    const cached = await cacheGet(cacheKey);

    if (cached) {
      console.log("⚡ getProblemDetail → Redis HIT");
      res.set("X-Cache", "HIT");
      return res.json({ success: true, problem: cached });
    }

    console.log("🗄️ getProblemDetail → MongoDB MISS");
    res.set("X-Cache", "MISS");

    const problem = await Problem.findOne({ slug }).lean();

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    await cacheSet(cacheKey, problem, 3600);

    res.json({ success: true, problem });
  } catch (err) {
    res.status(500).json({ message: "Failed to load problem" });
  }
};