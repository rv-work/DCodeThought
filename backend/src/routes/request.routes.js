import express from "express";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  addRequestSchema,
  voteRequestSchema,
} from "../validators/request.validation.js";

import {
  addRequest,
  voteRequest,
  getAllRequestsPublic,
} from "../controllers/request.controller.js";

const router = express.Router();

router.get("/", getAllRequestsPublic);
router.post("/add", protect, validate(addRequestSchema), addRequest);
router.post("/:id/vote", protect, validate(voteRequestSchema), voteRequest);

export default router;
