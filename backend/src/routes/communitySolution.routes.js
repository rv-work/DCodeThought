import express from "express";
import { protect } from "../middleware/auth.js"
import { validate } from "../middleware/validate.js"; 
import { rateLimit } from "../middleware/rateLimit.js"; 
import {
  submitCommunitySolutionSchema,
  tagSolutionSchema,
} from "../validators/communitySolution.validation.js";
import {
  submitSolution,
  getProblemSolutions,
  tagSolution,
} from "../controllers/communitySolution.controller.js";

const router = express.Router();

// Apply a strict rate limit for submitting solutions (e.g., 5 per hour) to prevent spam
const submitLimiter = rateLimit({ keyPrefix: "submit_sol", limit: 5, windowSec: 3600 });

// Apply a rate limit for tagging (e.g., 20 tags per hour)
const tagLimiter = rateLimit({ keyPrefix: "tag_sol", limit: 20, windowSec: 3600 });

// Routes
router.post("/", protect, submitLimiter, validate(submitCommunitySolutionSchema), submitSolution);
router.get("/problem/:problemId", getProblemSolutions); // Public route, no protect needed just to read
router.post("/:id/tag", protect, tagLimiter, validate(tagSolutionSchema), tagSolution);

export default router;