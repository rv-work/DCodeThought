import express from "express";
import { getFriendsLeaderboard, getLeaderboard, searchUsersForFriends } from "../controllers/leaderboard.controller.js";
import { protect } from "../middleware/auth.js";
import { toggleFriend } from "../controllers/profile.controller.js";

const router = express.Router();

// Public route to fetch leaderboards
router.get("/", getLeaderboard);
router.get("/friends", protect, getFriendsLeaderboard);
router.get("/friends/search", protect, searchUsersForFriends); 
router.post("/friends/:username", protect, toggleFriend);

export default router;