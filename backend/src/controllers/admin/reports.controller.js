import Report from "../../models/Report.js";
import { cacheDel } from "../../services/cache.service.js";


// ---------------- GET ALL ----------------
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


// ---------------- UPDATE STATUS ----------------
export const updateReportStatus = async (req, res) => {
  try {
    const { resolved } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { resolved },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // 🔥 Clear affected public cache
    await cacheDel("home:stats");

    res.json({ success: true, report });
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};