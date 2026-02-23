import Problem from "../../models/Problem.js";
import { generateSlug } from "../../utils/generateSlug.js";
import { cacheDel, cacheDelPrefix } from "../../services/cache.service.js";


// ---------------- GET ALL ----------------
export const getAllProblemsAdmin = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ problemNumber: 1 });
    res.json({ success: true, problems });
  } catch {
    res.status(500).json({ message: "Failed to load problems" });
  }
};


// ---------------- GET SINGLE ----------------
export const getSingleProblemAdmin = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json({ success: true, problem });
  } catch {
    res.status(500).json({ message: "Failed to fetch problem" });
  }
};


// ---------------- ADD ----------------
export const addProblemAdmin = async (req, res) => {
  try {
    const data = req.body;
    const slug = generateSlug(data.title, data.problemNumber);

    const exists = await Problem.findOne({ slug });
    if (exists)
      return res.status(400).json({ message: "Problem already exists" });

    const problem = await Problem.create({ ...data, slug });

    // 🔥 Clear affected public caches
    await cacheDelPrefix("problems:");
    await cacheDelPrefix("potd:");
    await cacheDelPrefix("contests:list:");
    await cacheDel("home:stats");

    res.json({ success: true, problem });
  } catch {
    res.status(500).json({ message: "Add problem failed" });
  }
};


// ---------------- UPDATE ----------------
export const updateProblemAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const oldProblem = await Problem.findById(id);
    if (!oldProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const updated = await Problem.findByIdAndUpdate(id, data, {
      new: true,
    });

    const slug = oldProblem.slug;

    // 🔥 Clear public caches
    await cacheDelPrefix("problems:");
    await cacheDelPrefix("potd:");
    await cacheDelPrefix("contests:list:");
    await cacheDel("home:stats");
    await cacheDel(`problem:slug:${slug}`);
    await cacheDel(`solution:slug:${slug}`);

    res.json({ success: true, problem: updated });
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};


// ---------------- DELETE ----------------
export const deleteProblemAdmin = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);

    if (problem) {
      const slug = problem.slug;

      // 🔥 Clear public caches
      await cacheDelPrefix("problems:");
      await cacheDelPrefix("potd:");
      await cacheDelPrefix("contests:list:");
      await cacheDel("home:stats");
      await cacheDel(`problem:slug:${slug}`);
      await cacheDel(`solution:slug:${slug}`);
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};