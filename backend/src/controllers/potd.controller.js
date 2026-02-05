import Problem from "../models/Problem.js";
import {
  cacheGet,
  cacheSet,
  cacheDel,
} from "../services/cache.service.js";

// ------------------------ GET TODAY'S POTD ------------------------
export const getTodayPOTD = async (req, res) => {
  try {
    const todayKey = "potd:today";
    const cached = await cacheGet(todayKey);

    if (cached) {
      return res.json({ fromCache: true, potd: cached });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const potd = await Problem.findOne({
      isPOTD: true,
      potdDate: today,
    });

    if (!potd) {
      return res.json({ success: true, potd: null });
    }

    await cacheSet(todayKey, potd, 86400); // cache 24 hours

    res.json({ success: true, potd });
  } catch (err) {
    res.status(500).json({ message: "Failed to load POTD" });
  }
};

// ------------------------ GET OLD POTDs ------------------------
export const getOldPOTDs = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = "" } = req.query;

    const skip = (page - 1) * limit;

    const regex = new RegExp(search, "i");

    const potds = await Problem.find({
      isPOTD: true,
      $or: [
        { title: regex },
        { problemNumber: Number(search) || -1 },
      ],
    })
      .sort({ potdDate: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ success: true, potds });
  } catch (err) {
    res.status(500).json({ message: "Failed to load old POTDs" });
  }
};

// ------------------------ ADMIN: SET TODAY'S POTD ------------------------
export const setTodayPOTD = async (req, res) => {
  try {
    const { problemId } = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Reset all old POTDs for today
    await Problem.updateMany(
      { potdDate: today },
      { $set: { isPOTD: false, potdDate: null } }
    );

    // Set new POTD
    problem.isPOTD = true;
    problem.potdDate = today;
    await problem.save();

    // Clear cache
    await cacheDel("potd:today");

    res.json({ success: true, potd: problem });
  } catch (err) {
    res.status(500).json({ message: "Set POTD failed" });
  }
};
