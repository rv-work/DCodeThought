import express from "express";
import { rateLimit } from "../middleware/rateLimit.js";
import {
  getTodayPotd,
  getPotdHistory,
} from "../controllers/potd.public.controller.js";

const router = express.Router();

router.get(
  "/today",
  rateLimit({ keyPrefix: "potd-today", limit: 60, windowSec: 60 }),
  getTodayPotd
);

router.get(
  "/history",
  rateLimit({ keyPrefix: "potd-history", limit: 60, windowSec: 60 }),
  getPotdHistory
);

export default router;
