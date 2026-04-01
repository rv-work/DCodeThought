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
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    user,
  });
};


const generateDefaultUsername = (name) => {
  const baseName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
  return `${baseName}${randomNum}`;
};

// ---------------------- EMAIL SIGNUP ----------------------
export const emailSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered",
      });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      username: generateDefaultUsername(name)
    });

    return sendToken(user, res);

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to signup. Please try again later.",
    });
  }
};

// ---------------------- EMAIL LOGIN ----------------------
export const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // EMAIL WRONG
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No account exists with this email",
      });
    }

    // PASSWORD WRONG
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    return sendToken(user, res);

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
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
        username: generateDefaultUsername(name)
      });
    }

    return sendToken(user, res);

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

// ---------------------- LOGOUT ---------------------
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({ success: true, message: "Logged out" });
};
