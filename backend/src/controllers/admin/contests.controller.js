import Contest from "../../models/Contest.js";
import Problem from "../../models/Problem.js";


/**
 * GET problems eligible for contest
 * - type = contest
 * - not used in any contest yet
 */
export const getContestProblems = async (req, res) => {
  try {
    const mode = req.query.mode;

    if (!mode || !["add", "edit"].includes(mode)) {
      return res.status(400).json({
        message: "Mode must be 'add' or 'edit'",
      });
    }

    let filter = { type: "contest" };

    if (mode === "add") {
      // Exclude already used problems
      const contests = await Contest.find().select("problems");

      const usedProblemIds = contests.flatMap(
        (c) => c.problems
      );

      filter._id = { $nin: usedProblemIds };
    }

    // edit mode → no exclusion

    const problems = await Problem.find(filter)
      .select("problemNumber title")
      .sort({ problemNumber: 1 });

    res.json({ success: true, problems });
  } catch {
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


export const getSingleContestAdmin = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id)
      .populate("problems", "problemNumber title");

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.json({ success: true, contest });
  } catch {
    res.status(500).json({ message: "Failed to fetch contest" });
  }
};

export const updateContestAdmin = async (req, res) => {
  try {

    const duplicate = await Contest.findOne({
  _id: { $ne: req.params.id },
  problems: { $in: req.body.problems },
});

if (duplicate) {
  return res.status(400).json({
    message: "Problem already used in another contest",
  });
}

    const updated = await Contest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("problems", "problemNumber title");

    res.json({ success: true, contest: updated });
  } catch {
    res.status(500).json({ message: "Update contest failed" });
  }
};
