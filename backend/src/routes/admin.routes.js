import express from "express";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

import { getAdminDashboard } from "../controllers/admin/dashboard.controller.js";
import adminProblemRoutes from "./admin/problems.routes.js";
import adminPotdRoutes from "./admin/potd.routes.js";

const router = express.Router();

router.use(protect, adminOnly);

router.use("/problems", adminProblemRoutes);
router.use("/potd", adminPotdRoutes);
router.use("/contests", adminContestRoutes);
router.use("/solutions", adminSolutionRoutes);
router.use("/users", adminUserRoutes);
router.use("/reports", adminReportRoutes);
router.use("/requests", adminRequestRoutes);



router.get("/dashboard", getAdminDashboard);

export default router;
