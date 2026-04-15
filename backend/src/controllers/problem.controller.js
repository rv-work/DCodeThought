import Problem from "../models/Problem.js";
import User from "../models/User.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

export const addRecentView = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1. Find the problem to get its ID
    const problem = await Problem.findOne({ slug }).select("_id");
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // 2. Fetch the user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Remove ANY existing entries of this problem (cleans up previous duplicates too)
    user.recentlyViewed = user.recentlyViewed.filter(
      (item) => item.problemId.toString() !== problem._id.toString()
    );

    // 4. Add the newly viewed problem to the very top (start of the array)
    user.recentlyViewed.unshift({
      problemId: problem._id,
      viewedAt: new Date(),
    });

    // 5. Keep only the last 20 entries to save space
    if (user.recentlyViewed.length > 20) {
      user.recentlyViewed = user.recentlyViewed.slice(0, 20);
    }

    // 6. Save the cleaned and updated array
    await user.save();

    res.json({ success: true });

  } catch (err) {
    console.error("Recent View Error:", err);
    res.status(500).json({ message: "Could not record view" });
  }
};



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