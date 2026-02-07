import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/admin.js";
import { validate } from "../../middleware/validate.js";
import { addPotdSchema } from "../../validators/potd.validation.js";

import {
  getAllPotdAdmin,
  addPotdAdmin,
  removePotdAdmin,
} from "../../controllers/admin/potd.controller.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAllPotdAdmin);
router.post("/add", validate(addPotdSchema), addPotdAdmin);
router.delete("/:problemId", removePotdAdmin);

export default router;
