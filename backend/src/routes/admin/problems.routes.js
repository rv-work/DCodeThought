import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/admin.js";
import { validate } from "../../middleware/validate.js";
import { addProblemSchema } from "../../validators/problem.validation.js";

import {
  getAllProblemsAdmin,
  addProblemAdmin,
  updateProblemAdmin,
  deleteProblemAdmin,
} from "../../controllers/admin/problems.controller.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAllProblemsAdmin);
router.post("/add", validate(addProblemSchema), addProblemAdmin);
router.put("/:id", validate(addProblemSchema), updateProblemAdmin);
router.delete("/:id", deleteProblemAdmin);

export default router;
