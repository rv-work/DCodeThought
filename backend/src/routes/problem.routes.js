import express from "express";
import { rateLimit } from "../middleware/rateLimit.js";
import {
  getPublicProblems,getProblemDetail
} from "../controllers/problem.controller.js";

const router = express.Router();

router.get(
  "/",
  rateLimit({ keyPrefix: "problems", limit: 60, windowSec: 60 }),
  getPublicProblems
);

router.get(
  "/:slug",
  rateLimit({ keyPrefix: "problem-detail", limit: 60, windowSec: 60 }),
  getProblemDetail
);

export default router;
