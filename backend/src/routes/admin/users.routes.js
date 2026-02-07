import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/admin.js";
import { getAllUsers } from "../../controllers/user.controller.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAllUsers);

export default router;
