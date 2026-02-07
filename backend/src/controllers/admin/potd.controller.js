import Problem from "../../models/Problem.js";

export const getAllPotdAdmin = async (req, res) => {
  try {
    const potds = await Problem.find({ type: "potd" })
      .sort({ potdDate: -1 });

    res.json({ success: true, potds });
  } catch {
    res.status(500).json({ message: "Failed to load POTDs" });
  }
};

export const addPotdAdmin = async (req, res) => {
  try {
    const { problemId, potdDate } = req.body;

    // ensure no duplicate date
    await Problem.updateMany(
      { potdDate },
      { $unset: { potdDate: "", type: "" } }
    );

    const problem = await Problem.findByIdAndUpdate(
      problemId,
      {
        type: "potd",
        potdDate,
      },
      { new: true }
    );

    res.json({ success: true, problem });
  } catch {
    res.status(500).json({ message: "Add POTD failed" });
  }
};

export const removePotdAdmin = async (req, res) => {
  try {
    await Problem.findByIdAndUpdate(req.params.problemId, {
      $unset: { potdDate: "", type: "" },
    });

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Remove POTD failed" });
  }
};
