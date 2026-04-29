import express from "express";
import { protect } from "../middleware/auth.js";
import { getUserHeatmap, syncMyDay, verifyProblemSync } from "../controllers/activity.controller.js";

const router = express.Router();

// Get heatmap for the currently logged-in user (My Dashboard)
router.get("/me/heatmap", protect, getUserHeatmap);

// Get heatmap for a public profile (Phase 3 me kaam aayega)
router.get("/:userId/heatmap", getUserHeatmap);

router.post("/verify-sync", protect, verifyProblemSync);

router.post("/sync-day", protect, syncMyDay);

export default router;