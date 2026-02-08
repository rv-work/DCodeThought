import express from "express";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

import { getAdminDashboard } from "../controllers/admin/dashboard.controller.js";

import adminProblemRoutes from "./admin/problems.routes.js";
import adminPotdRoutes from "./admin/potd.routes.js";
import adminContestRoutes from "./admin/contests.routes.js";
import adminSolutionRoutes from "./admin/solutions.routes.js";
import adminUserRoutes from "./admin/users.routes.js";
import adminReportRoutes from "./admin/reports.routes.js";
import adminRequestRoutes from "./admin/requests.routes.js";

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
