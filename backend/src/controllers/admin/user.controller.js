import User from "../../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.json({ success: true, users });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to load users",
    });
  }
};