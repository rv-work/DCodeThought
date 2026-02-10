// controllers/admin/solutions.controller.js
import Solution from "../../models/Solution.js";
import Problem from "../../models/Problem.js";

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

export const getAllSolutionsAdmin = async (req, res) => {
  try {
    const solutions = await Solution.find()
      .populate("problemId", "problemNumber title")
      .sort({ createdAt: -1 })
      .lean();

    // 🔁 DB → frontend normalize
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

export const addOrUpdateSolutionAdmin = async (req, res) => {
  try {
    const { problemId, code, ...rest } = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem)
      return res.status(404).json({ message: "Problem not found" });

    // 🔥 FRONTEND → DB TRANSFORM
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

    res.json({ success: true, solution });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Save solution failed" });
  }
};

export const deleteSolutionAdmin = async (req, res) => {
  try {
    await Solution.findOneAndDelete({ problemId: req.params.problemId });
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};
