import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/admin.js";
import { validate } from "../../middleware/validate.js";
import { addContestSchema } from "../../validators/contest.validation.js";

import {
  getAllContestsAdmin,
  addContestAdmin,
  deleteContestAdmin,
  updateContestAdmin,
  getSingleContestAdmin,
  getContestProblems,
} from "../../controllers/admin/contests.controller.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/problems", getContestProblems);
router.get("/", getAllContestsAdmin);
router.get("/:id", getSingleContestAdmin); // 👈 dynamic after specific
router.post("/add", validate(addContestSchema), addContestAdmin);
router.put("/:id", validate(addContestSchema), updateContestAdmin);
router.delete("/:id", deleteContestAdmin);


export default router;
