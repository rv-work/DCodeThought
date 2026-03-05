import Problem from "../models/Problem.js";
import Report from "../models/Report.js";

export const addReport = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, description, screenshot } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const problem = await Problem.findOne({ slug });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const report = await Report.create({
      title,
      description,
      screenshot,
      problemId: problem._id,
      userId: req.user._id,
    });

    res.json({ success: true, report });

  } catch (err) {
    console.error("Report Error:", err);
    res.status(500).json({ message: "Report submission failed" });
  }
};