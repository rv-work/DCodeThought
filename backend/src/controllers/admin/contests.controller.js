import Contest from "../../models/Contest.js";

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
