import CommunitySolution from "../models/CommunitySolution.js";
import User from "../models/User.js";
import Problem from "../models/Problem.js"; // Added to get problem type
import { updateStreakAndLogActivity } from "../utils/streakManager.js"; // Added for streak tracking

// 1. Submit a new approach/solution
export const submitSolution = async (req, res) => {
  try {
    const { problemId, approach, explanation, code, language } = req.body;
    const userId = req.user._id;

    // Save the solution in the community tab
    const newSolution = await CommunitySolution.create({
      problemId,
      userId,
      approach,
      explanation,
      code,
      language,
    });

    // 👇 NEW LOGIC: Trigger Streak and Activity Logging
    // Fetch problem to know if it's a 'potd', 'contest', or 'practice' problem
    const problem = await Problem.findById(problemId);
    const problemType = problem ? problem.type : "practice";

    // Update user's streak, log activity, and upgrade badges automatically
    await updateStreakAndLogActivity(userId, problemId, problemType);

    res.status(201).json({
      success: true,
      message: "Solution submitted and Streak updated successfully!",
      solution: newSolution,
    });
  } catch (error) {
    console.error("Error submitting solution:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 2. Get all community solutions for a specific problem
export const getProblemSolutions = async (req, res) => {
  try {
    const { problemId } = req.params;

    // Fetch solutions and populate user details (name, avatar, college, badges)
    const solutions = await CommunitySolution.find({ problemId })
      .populate("userId", "name college badges reputation")
      .sort({ "tagCounts.totalScore": -1, createdAt: -1 }); // Sort by Best Thinker score

    res.status(200).json({
      success: true,
      solutions,
    });
  } catch (error) {
    console.error("Error fetching solutions:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 3. Tag a solution (Helpful, Simplest, Creative)
export const tagSolution = async (req, res) => {
  try {
    const { id: solutionId } = req.params;
    const { tagType } = req.body;
    const userId = req.user._id;

    const solution = await CommunitySolution.findById(solutionId);
    if (!solution) {
      return res.status(404).json({ success: false, message: "Solution not found" });
    }

    // You cannot tag your own solution
    if (solution.userId.toString() === userId.toString()) {
      return res.status(400).json({ success: false, message: "You cannot tag your own solution!" });
    }

    // Check if user has already tagged this solution (Anti-Spam)
    const alreadyTagged = solution.taggedBy.find((tag) => tag.userId.toString() === userId.toString());
    if (alreadyTagged) {
      return res.status(400).json({ success: false, message: "You have already tagged this solution." });
    }

    // Update the solution's tag counts and add user to taggedBy array
    solution.tagCounts[tagType] += 1;
    solution.tagCounts.totalScore += 1;
    solution.taggedBy.push({ userId, tagType });
    await solution.save();

    // Increment the reputation of the user who WROTE the solution
    await User.findByIdAndUpdate(solution.userId, {
      $inc: {
        [`reputation.${tagType}`]: 1,
        "reputation.totalThinkerScore": 1,
      },
    });

    res.status(200).json({
      success: true,
      message: `Successfully tagged as ${tagType}!`,
      tagCounts: solution.tagCounts,
    });
  } catch (error) {
    console.error("Error tagging solution:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};