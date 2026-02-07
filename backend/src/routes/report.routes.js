import express from "express";
import { protect } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.js";
import { addReportSchema } from "../validators/report.validation.js";
import { addProblemReport } from "../controllers/report.public.controller.js";

const router = express.Router();

router.post(
  "/:slug",
  protect,
  rateLimit({ keyPrefix: "report-add", limit: 5, windowSec: 300 }),
  validate(addReportSchema),
  addProblemReport
);

export default router;
