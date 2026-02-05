import express from "express";
import {
  getTodayPOTD,
  getOldPOTDs,
  setTodayPOTD,
} from "../controllers/potd.controller.js";

import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";
import { rateLimit } from "../middleware/rateLimit.js";

const router = express.Router();

// PUBLIC
router.get("/today", getTodayPOTD);
router.get("/old", rateLimit({ keyPrefix: "search", limit: 15, windowSec: 60 }), getOldPOTDs);

// ADMIN ONLY
router.post("/set", protect, adminOnly, setTodayPOTD);

export default router;
