import Potd from "../../models/Potd.js";
import Problem from "../../models/Problem.js";
import { cacheDel, cacheDelPrefix } from "../../services/cache.service.js";


// ---------------- GET ALL ----------------
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


// ---------------- GET SINGLE ----------------
export const getSinglePotdAdmin = async (req, res) => {
  try {
    const potd = await Potd.findById(req.params.potdId)
      .populate("problem");

    if (!potd) {
      return res.status(404).json({ message: "POTD not found" });
    }

    res.json({ success: true, potd });
  } catch {
    res.status(500).json({ message: "Failed to fetch POTD" });
  }
};


// ---------------- UPDATE ----------------
export const updatePotdAdmin = async (req, res) => {
  try {
    const { problemId, potdDate } = req.body;

    const date = new Date(potdDate);
    date.setHours(0, 0, 0, 0);

    const updated = await Potd.findByIdAndUpdate(
      req.params.potdId,
      {
        problem: problemId,
        date,
      },
      { new: true }
    ).populate("problem");

    await cacheDel("potd:today");
    await cacheDelPrefix("potd:history:");
    await cacheDel("home:stats");

    res.json({ success: true, potd: updated });
  } catch {
    res.status(500).json({ message: "Update POTD failed" });
  }
};


// ---------------- ADD ----------------
export const addPotdAdmin = async (req, res) => {
  try {
    const { problemId, potdDate } = req.body;

    const date = new Date(potdDate);
    date.setHours(0, 0, 0, 0);

    await Potd.findOneAndDelete({ date });

    const potd = await Potd.create({
      problem: problemId,
      date,
    });

    await cacheDel("potd:today");
    await cacheDelPrefix("potd:history:");
    await cacheDel("home:stats");

    res.json({ success: true, potd });
  } catch {
    res.status(500).json({ message: "Add POTD failed" });
  }
};


// ---------------- REMOVE ----------------
export const removePotdAdmin = async (req, res) => {
  try {
    await Potd.findByIdAndDelete(req.params.potdId);

    // 🔥 Clear public caches
    await cacheDel("potd:today");
    await cacheDelPrefix("potd:history:");
    await cacheDel("home:stats");

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Remove POTD failed" });
  }
};



// ---------------- AVAILABLE PROBLEMS ----------------
export const getAvailableProblemsForPotd = async (req, res) => {
  try {
    const potds = await Potd.find().select("problem");
    const usedProblemIds = potds.map((p) => p.problem);

    const problems = await Problem.find({
      _id: { $nin: usedProblemIds },
      type: "potd",
    }).sort({ problemNumber: 1 });

    res.json({ success: true, problems });
  } catch {
    res.status(500).json({ message: "Failed to load available problems" });
  }
};