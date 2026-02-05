import express from "express";

import {
  addOrUpdateContest,
  getAllContests,
  getContestDetails,
  searchContests,
} from "../controllers/contest.controller.js";

import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.js";
import { addContestSchema } from "../validators/contest.validation.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllContests);

router.get("/search",
  rateLimit({ keyPrefix: "search-contest", limit: 10, windowSec: 60 }),
  searchContests
);

router.get("/:contestNumber", getContestDetails);

// ADMIN ROUTE
router.post("/add", protect, adminOnly, validate(addContestSchema), addOrUpdateContest);

export default router;
