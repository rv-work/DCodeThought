import Report from "../models/Report.js";

export const addReport = async (req, res) => {
  try {
    const report = await Report.create({
      ...req.body,
      userId: req.user._id,
    });

    res.json({ success: true, report });
  } catch {
    res.status(500).json({ message: "Report submission failed" });
  }
};
