import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getMyProfile,
  getMyReports,
  getMyRequests,
  getMyRecentProblems,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.get("/me/reports", protect, getMyReports);
router.get("/me/requests", protect, getMyRequests);
router.get("/me/recent", protect, getMyRecentProblems);

export default router;
