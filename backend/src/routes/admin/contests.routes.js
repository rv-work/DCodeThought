import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/admin.js";
import { validate } from "../../middleware/validate.js";
import { addContestSchema } from "../../validators/contest.validation.js";

import {
  getAllContestsAdmin,
  addContestAdmin,
  deleteContestAdmin,
} from "../../controllers/admin/contests.controller.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAllContestsAdmin);
router.post("/add", validate(addContestSchema), addContestAdmin);
router.delete("/:id", deleteContestAdmin);

export default router;
