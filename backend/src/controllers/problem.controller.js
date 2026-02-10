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

    const skip = (page - 1) * limit;

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

    const sortQuery = sort === "oldest" ? { addedAt: 1 } : { addedAt: -1 };

    const cacheKey = `problems:${page}:${limit}:${search}:${difficulty}:${type}:${sort}`;
    const cached = await cacheGet(cacheKey);

    if (cached) {
      return res.json({ fromCache: true, ...cached });
    }

    const [problems, total] = await Promise.all([
      Problem.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(Number(limit))
        .select("problemNumber title difficulty slug type tags addedAt"),
      Problem.countDocuments(query),
    ]);

    const payload = {
      success: true,
      problems,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
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
      return res.json({ fromCache: true, problem: cached });
    }

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