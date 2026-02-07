import express from "express";
import { rateLimit } from "../middleware/rateLimit.js";
import { getSolutionByProblemSlug } from "../controllers/solution.public.controller.js";

const router = express.Router();

router.get(
  "/:slug",
  rateLimit({ keyPrefix: "solution", limit: 60, windowSec: 60 }),
  getSolutionByProblemSlug
);

export default router;
