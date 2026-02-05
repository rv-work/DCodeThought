import Problem from "../models/Problem.js";
import { generateSlug } from "../utils/generateSlug.js";
import { cacheGet, cacheSet, cacheDel } from "../services/cache.service.js";

// ---------------------- ADMIN: ADD PROBLEM ----------------------
export const addProblem = async (req, res) => {
  try {
    const {
      problemNumber,
      title,
      leetcodeLink,
      tags,
      difficulty,
      isPOTD,
      potdDate,
      isContest,
      contestNumber,
      contestName,
      contestDate,
    } = req.body;

    const slug = generateSlug(title, problemNumber);

    const exists = await Problem.findOne({ slug });
    if (exists) return res.status(400).json({ message: "Problem already exists" });

    const problem = await Problem.create({
      problemNumber,
      title,
      slug,
      leetcodeLink,
      tags,
      difficulty,
      isPOTD,
      potdDate,
      isContest,
      contestNumber,
      contestName,
      contestDate,
    });

    // Clear cache for lists
    await cacheDel("problems:all");

    res.json({ success: true, problem });
  } catch (err) {
    res.status(500).json({ message: "Add problem failed", error: err.message });
  }
};

// ---------------------- GET ALL PROBLEMS ----------------------
export const getAllProblems = async (req, res) => {
  try {
    // Check Redis cache
    const cached = await cacheGet("problems:all");
    if (cached) return res.json({ fromCache: true, problems: cached });

    const problems = await Problem.find().sort({ problemNumber: 1 });

    // Save to cache for 1 hour
    await cacheSet("problems:all", problems, 3600);

    res.json({ success: true, problems });
  } catch (err) {
    res.status(500).json({ message: "Failed to load problems" });
  }
};

// ---------------------- GET PROBLEM BY SLUG ----------------------
export const getProblemBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const key = `problem:${slug}`;
    const cached = await cacheGet(key);
    if (cached) return res.json({ fromCache: true, problem: cached });

    const problem = await Problem.findOne({ slug });
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    await cacheSet(key, problem, 3600);

    res.json({ success: true, problem });
  } catch (err) {
    res.status(500).json({ message: "Failed to load problem" });
  }
};

// ---------------------- SEARCH PROBLEMS ----------------------
export const searchProblems = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) return res.json({ success: true, problems: [] });

    const regex = new RegExp(q, "i");

    const problems = await Problem.find({
      $or: [
        { title: regex },
        { tags: regex },
        { problemNumber: Number(q) || -1 },
      ],
    });

    res.json({ success: true, problems });
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};
