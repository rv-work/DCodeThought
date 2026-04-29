import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getMyProfile,
  updateProfile,
  getPublicProfile,
  getMyReports,
  getMyRequests,
  getMyRecentProblems,
  toggleFriend,
  compareUsers,
  joinChallenge,
  linkLeetcode,
  getLeetcodeStats,
  getPublicLeetcodeStats,
  unlinkLeetcode,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/u/:username", getPublicProfile);

router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateProfile); 
router.get("/me/reports", protect, getMyReports);
router.get("/me/requests", protect, getMyRequests);
router.get("/me/recent", protect, getMyRecentProblems);
router.post("/friends/:username", protect, toggleFriend);
router.get("/u/:username/leetcode-stats", getPublicLeetcodeStats);
router.get("/compare", compareUsers);
router.post("/me/challenge", protect, joinChallenge);

router.post("/me/leetcode", protect, linkLeetcode);
router.delete("/me/leetcode", protect, unlinkLeetcode);
router.get("/me/leetcode-stats", protect, getLeetcodeStats);

export default router;