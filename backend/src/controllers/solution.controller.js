import Solution from "../models/Solution.js";
import Problem from "../models/Problem.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

export const getSolutionByProblemSlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const cacheKey = `solution:slug:${slug}`;
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return res.json({ fromCache: true, solution: cached });
    }

    const problem = await Problem.findOne({ slug });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const solution = await Solution.findOne({ problemId: problem._id }).lean();
    if (!solution) {
      return res.json({ success: true, solution: null });
    }

    await cacheSet(cacheKey, solution, 3600);

    res.json({ success: true, solution });
  } catch {
    res.status(500).json({ message: "Failed to load solution" });
  }
};
