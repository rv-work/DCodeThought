import express from "express";
import {
  addOrUpdateSolution,
  getSolutionByProblemId,
} from "../controllers/solution.controller.js";

import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";
import { validate } from "../middleware/validate.js";
import { solutionSchema } from "../validators/solution.validation.js";

const router = express.Router();

// PUBLIC
router.get("/:problemId", getSolutionByProblemId);

// ADMIN ONLY
router.post("/add", protect, adminOnly, validate(solutionSchema), addOrUpdateSolution);

export default router;
