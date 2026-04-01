import express from "express";
import { protect } from "../middleware/auth.js";
import { getUserHeatmap } from "../controllers/activity.controller.js";

const router = express.Router();

// Get heatmap for the currently logged-in user (My Dashboard)
router.get("/me/heatmap", protect, getUserHeatmap);

// Get heatmap for a public profile (Phase 3 me kaam aayega)
router.get("/:userId/heatmap", getUserHeatmap);

export default router;