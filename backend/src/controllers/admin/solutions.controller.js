// controllers/admin/solutions.controller.js
import Solution from "../../models/Solution.js";
import Problem from "../../models/Problem.js";
import { cacheDel } from "../../services/cache.service.js";


// ---------------- AVAILABLE PROBLEMS ----------------
export const getAvailableProblemsForSolution = async (req, res) => {
  try {
    const solutions = await Solution.find().select("problemId");
    const usedIds = solutions.map((s) => s.problemId);

    const problems = await Problem.find({
      _id: { $nin: usedIds },
    }).select("problemNumber title type");

    res.json({ success: true, problems });
  } catch {
    res.status(500).json({ message: "Failed to load problems" });
  }
};


// ---------------- GET ALL ----------------
export const getAllSolutionsAdmin = async (req, res) => {
  try {
    const solutions = await Solution.find()
      .populate("problemId", "problemNumber title slug")
      .sort({ createdAt: -1 })
      .lean();

    const normalized = solutions.map((s) => ({
      ...s,
      code: Object.fromEntries(
        (s.codeBlocks || []).map((cb) => [cb.language, cb.code])
      ),
    }));

    res.json({ success: true, solutions: normalized });
  } catch {
    res.status(500).json({ message: "Failed to load solutions" });
  }
};


// ---------------- ADD OR UPDATE ----------------
export const addOrUpdateSolutionAdmin = async (req, res) => {
  try {
    const { problemId, code, ...rest } = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem)
      return res.status(404).json({ message: "Problem not found" });

    const codeBlocks = code
      ? Object.entries(code).map(([language, value]) => ({
          language,
          code: value,
        }))
      : [];

    const solution = await Solution.findOneAndUpdate(
      { problemId },
      {
        problemId,
        ...rest,
        codeBlocks,
      },
      { upsert: true, new: true }
    );

    // 🔥 Clear public cache
    await cacheDel(`solution:slug:${problem.slug}`);

    res.json({ success: true, solution });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Save solution failed" });
  }
};


// ---------------- DELETE ----------------
export const deleteSolutionAdmin = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    await Solution.findOneAndDelete({
      problemId: req.params.problemId,
    });

    // 🔥 Clear public cache
    await cacheDel(`solution:slug:${problem.slug}`);

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};


// ---------------- GET SINGLE ----------------
export const getSingleSolutionAdmin = async (req, res) => {
  try {
    const solution = await Solution.findOne({
      problemId: req.params.problemId,
    })
      .populate("problemId", "problemNumber title")
      .lean();

    if (!solution) {
      return res.status(404).json({
        message: "Solution not found",
      });
    }

    const normalized = {
      ...solution,
      code: Object.fromEntries(
        (solution.codeBlocks || []).map((cb) => [
          cb.language,
          cb.code,
        ])
      ),
    };

    res.json({ success: true, solution: normalized });
  } catch {
    res.status(500).json({
      message: "Failed to fetch solution",
    });
  }
};