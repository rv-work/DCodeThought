import express from "express";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

import {
  getMe,
  updateProfile,
  addRecentView,
  getAllUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

// USER SELF ROUTES
router.get("/me", protect, getMe);
router.put("/update", protect, updateProfile);

// Track Recently Viewed
router.post("/recent", protect, addRecentView);

// ADMIN ROUTE
router.get("/all", protect, adminOnly, getAllUsers);

export default router;
