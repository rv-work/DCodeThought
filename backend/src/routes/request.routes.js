import express from "express";
import { protect } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.js";
import {
  getPublicRequests,
  addRequest,
  toggleVote,
} from "../controllers/request.controller.js";
import { addRequestSchema } from "../validators/request.validation.js";

const router = express.Router();

router.get(
  "/",
  rateLimit({ keyPrefix: "requests", limit: 60, windowSec: 60 }),
  getPublicRequests
);

router.post(
  "/",
  protect,
  rateLimit({ keyPrefix: "request-add", limit: 5, windowSec: 300 }),
  validate(addRequestSchema),
  addRequest
);

router.post(
  "/vote/:id",
  protect,
  rateLimit({ keyPrefix: "request-vote", limit: 30, windowSec: 60 }),
  toggleVote
);

export default router;
