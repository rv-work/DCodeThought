import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import potdRoutes from "./routes/potd.routes.js";
import contestRoutes from "./routes/contest.routes.js";
import solutionRoutes from "./routes/solution.routes.js";
import homeRoutes from "./routes/home.routes.js";
import statsRoutes from "./routes/stats.routes.js";


import cookieParser from "cookie-parser";


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/potd", potdRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/stats", statsRoutes);



// Health check
app.get("/", (req, res) => {
  res.json({ status: "Backend running 🚀" });
});

app.get("/redis-test", async (req, res) => {
  await redis.set("ping", "pong");
  const data = await redis.get("ping");
  res.send({ data });
});


export default app;
