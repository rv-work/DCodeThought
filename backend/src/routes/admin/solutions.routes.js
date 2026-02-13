import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/admin.js";
import { validate } from "../../middleware/validate.js";
import { solutionSchema } from "../../validators/solution.validation.js";

import {
  getAllSolutionsAdmin,
  addOrUpdateSolutionAdmin,
  deleteSolutionAdmin,
  getAvailableProblemsForSolution,
  getSingleSolutionAdmin,
} from "../../controllers/admin/solutions.controller.js";

const router = express.Router();

router.use(protect, adminOnly);


router.get("/available-problems", getAvailableProblemsForSolution);
router.get("/", getAllSolutionsAdmin);
router.get("/:problemId", getSingleSolutionAdmin); // 👈 after specific
router.post("/save", validate(solutionSchema), addOrUpdateSolutionAdmin);
router.delete("/:problemId", deleteSolutionAdmin);


export default router;
