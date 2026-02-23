import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../utils/generateToken.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to set cookie
const sendToken = (user, res) => {
  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // in development => false
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({
    success: true,
    user,
  });
};

// ---------------------- EMAIL SIGNUP ----------------------
export const emailSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    return sendToken(user, res);
  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

// ---------------------- EMAIL LOGIN ----------------------
export const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    return sendToken(user, res);
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

// ---------------------- GOOGLE LOGIN ----------------------
export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
      });
    }

    return sendToken(user, res);
  } catch (err) {
    res.status(500).json({ message: "Google login failed" });
  }
};

// ---------------------- LOGOUT -----------------------
export const logout = async (req, res) => {
  res.clearCookie("token", {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
});

  res.json({ success: true, message: "Logged out" });
};
