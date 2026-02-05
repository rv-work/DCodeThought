import express from "express";
import { emailSignup, emailLogin, googleLogin, logout } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { signupSchema, loginSchema, googleSchema } from "../validators/auth.validation.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), emailSignup);
router.post("/login", validate(loginSchema), emailLogin);
router.post("/google", validate(googleSchema), googleLogin);
router.post("/logout", logout);

export default router;
