import Solution from "../../models/Solution.js";
import Problem from "../../models/Problem.js";

export const getAllSolutionsAdmin = async (req, res) => {
  try {
    const solutions = await Solution.find()
      .populate("problemId", "problemNumber title")
      .sort({ createdAt: -1 });

    res.json({ success: true, solutions });
  } catch {
    res.status(500).json({ message: "Failed to load solutions" });
  }
};

export const addOrUpdateSolutionAdmin = async (req, res) => {
  try {
    const { problemId, ...data } = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem)
      return res.status(404).json({ message: "Problem not found" });

    const solution = await Solution.findOneAndUpdate(
      { problemId },
      { problemId, ...data },
      { upsert: true, new: true }
    );

    res.json({ success: true, solution });
  } catch {
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
