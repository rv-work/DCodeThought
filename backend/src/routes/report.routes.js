import express from "express";
import { protect } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.js";
import { addReportSchema } from "../validators/report.validation.js";
import { addReport } from "../controllers/report.controller.js";

const router = express.Router();

router.post(
  "/:slug",
  protect,
  rateLimit({ keyPrefix: "report-add", limit: 5, windowSec: 300 }),
  validate(addReportSchema),
  addReport
);

export default router;
