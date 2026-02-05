import Contest from "../models/Contest.js";
import Problem from "../models/Problem.js";
import {
  cacheGet,
  cacheSet,
  cacheDel,
} from "../services/cache.service.js";

// ---------------------- ADMIN: ADD / UPDATE CONTEST ----------------------
export const addOrUpdateContest = async (req, res) => {
  try {
    const {
      contestNumber,
      contestName,
      contestDate,
      problems, // array of 4 problemIds
    } = req.body;

    let existing = await Contest.findOne({ contestNumber });

    let contest;

    if (existing) {
      // UPDATE CONTEST
      contest = await Contest.findOneAndUpdate(
        { contestNumber },
        { contestName, contestDate, problems },
        { new: true }
      );
    } else {
      // ADD NEW
      contest = await Contest.create({
        contestNumber,
        contestName,
        contestDate,
        problems,
      });
    }

    // Clear cached contest list
    await cacheDel("contests:all");

    // Clear individual contest cache
    await cacheDel(`contest:${contestNumber}`);

    res.json({ success: true, contest });
  } catch (err) {
    res.status(500).json({ message: "Contest save failed", error: err.message });
  }
};

// ---------------------- GET ALL CONTESTS (PUBLIC) ----------------------
export const getAllContests = async (req, res) => {
  try {
    const cacheKey = "contests:all";
    const cached = await cacheGet(cacheKey);

    if (cached) return res.json({ fromCache: true, contests: cached });

    const contests = await Contest.find().sort({ contestNumber: -1 });

    await cacheSet(cacheKey, contests, 3600); // Cache 1 hour

    res.json({ success: true, contests });
  } catch (err) {
    res.status(500).json({ message: "Failed to load contests" });
  }
};

// ---------------------- GET A SINGLE CONTEST & ITS PROBLEMS ----------------------
export const getContestDetails = async (req, res) => {
  try {
    const { contestNumber } = req.params;

    const cacheKey = `contest:${contestNumber}`;
    const cached = await cacheGet(cacheKey);

    if (cached) return res.json({ fromCache: true, contest: cached });

    const contest = await Contest.findOne({ contestNumber })
      .populate("problems");

    if (!contest)
      return res.status(404).json({ message: "Contest not found" });

    await cacheSet(cacheKey, contest, 3600);

    res.json({ success: true, contest });
  } catch (err) {
    res.status(500).json({ message: "Failed to load contest" });
  }
};

// ---------------------- SEARCH CONTESTS ----------------------
export const searchContests = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) return res.json({ success: true, contests: [] });

    const regex = new RegExp(q, "i");

    const contests = await Contest.find({
      $or: [
        { contestName: regex },
        { contestNumber: Number(q) || -1 },
      ],
    });

    res.json({ success: true, contests });
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};
