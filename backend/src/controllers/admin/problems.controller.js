import Problem from "../../models/Problem.js";
import { generateSlug } from "../../utils/generateSlug.js";

export const getAllProblemsAdmin = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ problemNumber: 1 });
    res.json({ success: true, problems });
  } catch {
    res.status(500).json({ message: "Failed to load problems" });
  }
};

export const addProblemAdmin = async (req, res) => {
  try {
    const data = req.body;
    const slug = generateSlug(data.title, data.problemNumber);

    const exists = await Problem.findOne({ slug });
    if (exists)
      return res.status(400).json({ message: "Problem already exists" });

    const problem = await Problem.create({ ...data, slug });

    res.json({ success: true, problem });
  } catch (err) {
    res.status(500).json({ message: "Add problem failed" });
  }
};

export const updateProblemAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await Problem.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json({ success: true, problem: updated });
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteProblemAdmin = async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};
