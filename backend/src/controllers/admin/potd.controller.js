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



export const getSinglePotdAdmin = async (req, res) => {
  try {

    const potd = await Potd.findById(req.params.potdId).populate("problem");

    if (!potd) {
      return res.status(404).json({ message: "POTD not found" });
    }


    res.json({ success: true, potd });
  } catch {
    res.status(500).json({ message: "Failed to fetch POTD" });
  }
};

export const updatePotdAdmin = async (req, res) => {
  try {
    const { problemId, potdDate } = req.body;

    const updated = await Potd.findByIdAndUpdate(
      req.params.potdId,
      {
        problem: problemId,
        date: potdDate,
      },
      { new: true }
    ).populate("problem");

    res.json({ success: true, potd: updated });
  } catch {
    res.status(500).json({ message: "Update POTD failed" });
  }
};


/**
 * ADD POTD
 */
export const addPotdAdmin = async (req, res) => {
  try {

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
  try {
    const potds = await Potd.find().select("problem");
    const usedProblemIds = potds.map((p) => p.problem);

    const problems = await Problem.find({
      _id: { $nin: usedProblemIds },
      type: "potd", // ✅ Only POTD type problems
    }).sort({ problemNumber: 1 });

    res.json({ success: true, problems });
  } catch (err) {
    res.status(500).json({ message: "Failed to load available problems" });
  }
};


