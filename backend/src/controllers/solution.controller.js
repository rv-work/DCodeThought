import Solution from "../models/Solution.js";
import Problem from "../models/Problem.js";
import { cacheGet, cacheSet } from "../services/cache.service.js";

export const getSolutionByProblemSlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const cacheKey = `solution:slug:${slug}`;
    const cached = await cacheGet(cacheKey);

    if (cached !== null) {
      console.log("⚡ getSolutionByProblemSlug → Redis HIT");
      res.set("X-Cache", "HIT");
      return res.json({ success: true, solution: cached });
    }

    console.log("🗄️ getSolutionByProblemSlug → MongoDB MISS");
    res.set("X-Cache", "MISS");

    const problem = await Problem.findOne({ slug }).lean();
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const solution = await Solution.findOne({
      problemId: problem._id,
    }).lean();

    // 🔥 IMPORTANT: cache even null result to avoid repeated DB hits
    await cacheSet(cacheKey, solution, 3600);

    res.json({ success: true, solution });
  } catch (err) {
    res.status(500).json({ message: "Failed to load solution" });
  }
};