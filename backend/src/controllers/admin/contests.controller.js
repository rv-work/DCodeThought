import Contest from "../../models/Contest.js";
import Problem from "../../models/Problem.js";


/**
 * GET problems eligible for contest
 * - type = contest
 * - not used in any contest yet
 */
export const getAvailableContestProblems = async (req, res) => {
  try {
    // 1️⃣ saare contests se used problem ids nikaalo
    const contests = await Contest.find().select("problems");

    const usedProblemIds = contests.flatMap(
      (c) => c.problems
    );

    // 2️⃣ sirf contest-type problems jo use nahi hue
    const problems = await Problem.find({
      type: "contest",
      _id: { $nin: usedProblemIds },
    }).select("problemNumber title");

    res.json({ success: true, problems });
  } catch (err) {
    res.status(500).json({
      message: "Failed to load contest problems",
    });
  }
};

export const getAllContestsAdmin = async (req, res) => {
  try {
    const contests = await Contest.find()
      .populate("problems", "problemNumber title")
      .sort({ contestNumber: -1 });

    res.json({ success: true, contests });
  } catch {
    res.status(500).json({ message: "Failed to load contests" });
  }
};

export const addContestAdmin = async (req, res) => {
  try {
    const contest = await Contest.create(req.body);
    res.json({ success: true, contest });
  } catch {
    res.status(500).json({ message: "Add contest failed" });
  }
};

export const deleteContestAdmin = async (req, res) => {
  try {
    await Contest.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Delete contest failed" });
  }
};
