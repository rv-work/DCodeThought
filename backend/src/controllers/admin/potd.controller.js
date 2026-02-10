import Potd from "../../models/Potd.js";
import Problem from "../../models/Problem.js";

/**
 * GET all POTDs (not problems)
 */
export const getAllPotdAdmin = async (req, res) => {
  try {
    const potds = await Potd.find()
      .populate("problem")
      .sort({ date: -1 });

    res.json({ success: true, potds });
  } catch {
    res.status(500).json({ message: "Failed to load POTDs" });
  }
};

/**
 * ADD POTD
 */
export const addPotdAdmin = async (req, res) => {
  try {

    console.log("1")
    const { problemId, potdDate } = req.body;

    // ensure date uniqueness
    await Potd.findOneAndDelete({ date: potdDate });

    const potd = await Potd.create({
      problem: problemId,
      date: potdDate,
    });

    res.json({ success: true, potd });
  } catch {
    res.status(500).json({ message: "Add POTD failed" });
  }
};

/**
 * REMOVE POTD
 */
export const removePotdAdmin = async (req, res) => {
  try {
    await Potd.findByIdAndDelete(req.params.potdId);
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Remove POTD failed" });
  }
};





// GET /api/admin/potd/available-problems
export const getAvailableProblemsForPotd = async (req, res) => {
  const potds = await Potd.find().select("problem");
  const usedProblemIds = potds.map((p) => p.problem);

  const problems = await Problem.find({
    _id: { $nin: usedProblemIds },
  });

  res.json({ success: true, problems });
};

