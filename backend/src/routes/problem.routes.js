import express from "express";
import {
  addProblem,
  getAllProblems,
  getProblemBySlug,
  searchProblems,
} from "../controllers/problem.controller.js";

import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.js";
import { addProblemSchema } from "../validators/problem.validation.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllProblems);
router.get("/search", rateLimit({ keyPrefix: "search", limit: 10, windowSec: 60 }), searchProblems);
router.get("/:slug", getProblemBySlug);

// ADMIN ROUTES
router.post("/add", protect, adminOnly, validate(addProblemSchema), addProblem);

export default router;
