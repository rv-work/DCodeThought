import express from "express";
import { rateLimit } from "../middleware/rateLimit.js";
import {
  getPublicContests,
  getContestDetail,
} from "../controllers/contest.public.controller.js";

const router = express.Router();

router.get(
  "/",
  rateLimit({ keyPrefix: "contests", limit: 60, windowSec: 60 }),
  getPublicContests
);

router.get(
  "/:contestNumber",
  rateLimit({ keyPrefix: "contest-detail", limit: 60, windowSec: 60 }),
  getContestDetail
);

export default router;
