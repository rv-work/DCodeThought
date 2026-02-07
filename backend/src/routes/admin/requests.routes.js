import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/admin.js";
import { validate } from "../../middleware/validate.js";
import { completeRequestSchema } from "../../validators/request.validation.js";

import {
  getAllRequestsAdmin,
  markRequestCompleted,
} from "../../controllers/admin/requests.controller.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAllRequestsAdmin);
router.patch("/:id", validate(completeRequestSchema), markRequestCompleted);

export default router;
