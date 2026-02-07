import Report from "../../models/Report.js";

export const getAllReportsAdmin = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, reports });
  } catch {
    res.status(500).json({ message: "Failed to load reports" });
  }
};

export const updateReportStatus = async (req, res) => {
  try {
    const { resolved } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { resolved },
      { new: true }
    );

    res.json({ success: true, report });
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};
