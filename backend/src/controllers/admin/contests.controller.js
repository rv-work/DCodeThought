import Contest from "../../models/Contest.js";
import Problem from "../../models/Problem.js";
import { cacheDel, cacheDelPrefix } from "../../services/cache.service.js";


// ---------------- GET ELIGIBLE PROBLEMS ----------------
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
      const contests = await Contest.find().select("problems");
      const usedProblemIds = contests.flatMap((c) => c.problems);
      filter._id = { $nin: usedProblemIds };
    }

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


// ---------------- GET ALL CONTESTS ----------------
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


// ---------------- ADD CONTEST ----------------
export const addContestAdmin = async (req, res) => {
  try {
    const contest = await Contest.create(req.body);

    // 🔥 Clear public caches
    await cacheDelPrefix("contests:list:");
    await cacheDel("home:stats");

    res.json({ success: true, contest });
  } catch {
    res.status(500).json({ message: "Add contest failed" });
  }
};


// ---------------- DELETE CONTEST ----------------
export const deleteContestAdmin = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);

    if (contest) {
      await cacheDelPrefix("contests:list:");
      await cacheDel(`contest:${contest.contestNumber}`);
      await cacheDel("home:stats");
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Delete contest failed" });
  }
};


// ---------------- GET SINGLE ----------------
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


// ---------------- UPDATE ----------------
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

    if (updated) {
      await cacheDelPrefix("contests:list:");
      await cacheDel(`contest:${updated.contestNumber}`);
      await cacheDel("home:stats");
    }

    res.json({ success: true, contest: updated });
  } catch {
    res.status(500).json({ message: "Update contest failed" });
  }
};