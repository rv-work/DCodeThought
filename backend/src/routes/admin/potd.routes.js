import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/admin.js";
import { validate } from "../../middleware/validate.js";
import { addPotdSchema } from "../../validators/potd.validation.js";

import {
  getAllPotdAdmin,
  addPotdAdmin,
  removePotdAdmin,
  getAvailableProblemsForPotd,
  getSinglePotdAdmin,
  updatePotdAdmin,
} from "../../controllers/admin/potd.controller.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAllPotdAdmin);
router.get("/available-problems", getAvailableProblemsForPotd);
router.post("/add", validate(addPotdSchema), addPotdAdmin);


router.get("/:potdId", getSinglePotdAdmin);
router.put("/:potdId", validate(addPotdSchema), updatePotdAdmin);
router.delete("/:potdId", removePotdAdmin);


export default router;
