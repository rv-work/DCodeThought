import express from "express";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { addReportSchema } from "../validators/report.validation.js";
import { addReport } from "../controllers/report.controller.js";

const router = express.Router();

router.post("/add", protect, validate(addReportSchema), addReport);

export default router;
