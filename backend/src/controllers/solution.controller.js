import Solution from "../models/Solution.js";
import Problem from "../models/Problem.js";
import {
  cacheGet,
  cacheSet,
  cacheDel,
} from "../services/cache.service.js";

// ---------------------- ADD / UPDATE SOLUTION (Admin) ----------------------
export const addOrUpdateSolution = async (req, res) => {
  try {
    const {
      problemId,
      myThought,
      engThought,
      hints = [],
      codeBlocks = [],
      youtubeLink,
    } = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem does not exist" });
    }

    let existing = await Solution.findOne({ problemId });

    let solution;

    if (existing) {
      // UPDATE
      solution = await Solution.findOneAndUpdate(
        { problemId },
        {
          myThought,
          engThought,
          hints,
          codeBlocks,
          youtubeLink,
        },
        { new: true }
      );
    } else {
      // ADD NEW
      solution = await Solution.create({
        problemId,
        myThought,
        engThought,
        hints,
        codeBlocks,
        youtubeLink,
      });
    }

    // Clear cache
    const cacheKey = `solution:${problemId}`;
    await cacheDel(cacheKey);

    res.json({ success: true, solution });
  } catch (err) {
    res.status(500).json({
      message: "Solution add/update failed",
      error: err.message,
    });
  }
};

// ---------------------- GET SOLUTION (Public) ----------------------
export const getSolutionByProblemId = async (req, res) => {
  try {
    const { problemId } = req.params;

    const cacheKey = `solution:${problemId}`;
    const cached = await cacheGet(cacheKey);

    if (cached) {
      return res.json({ fromCache: true, solution: cached });
    }

    const solution = await Solution.findOne({ problemId });
    if (!solution) {
      return res.status(404).json({ message: "No solution found" });
    }

    // Cache for 6 hours
    await cacheSet(cacheKey, solution, 6 * 3600);

    res.json({ success: true, solution });
  } catch (err) {
    res.status(500).json({ message: "Failed to load solution" });
  }
};
