import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import potdRoutes from "./routes/potd.routes.js";
import contestRoutes from "./routes/contest.routes.js";
import solutionRoutes from "./routes/solution.routes.js";
import homeRoutes from "./routes/home.routes.js";

dotenv.config();

const app = express();

// ✅ CORS (MUST be before routes) if **credentials : are included**
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", userRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/potd", potdRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/requests", requestRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Backend running 🚀" });
});

export default app;
