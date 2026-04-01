import express from "express";
import { getFriendsLeaderboard, getLeaderboard } from "../controllers/leaderboard.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public route to fetch leaderboards
router.get("/", getLeaderboard);
router.get("/friends", protect, getFriendsLeaderboard);

export default router;