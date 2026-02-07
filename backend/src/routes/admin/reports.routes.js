import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/admin.js";
import { validate } from "../../middleware/validate.js";
import { resolveReportSchema } from "../../validators/report.validation.js";

import {
  getAllReportsAdmin,
  updateReportStatus,
} from "../../controllers/admin/reports.controller.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAllReportsAdmin);
router.patch("/:id", validate(resolveReportSchema), updateReportStatus);

export default router;
