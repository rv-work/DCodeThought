import User from "../models/User.js";

// ---------------------- GET CURRENT USER ----------------------
export const getMe = async (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
};

// ---------------------- UPDATE USER PROFILE ----------------------
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true }
    ).select("-password");

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ---------------------- ADD RECENTLY VIEWED PROBLEM ----------------------
export const addRecentView = async (req, res) => {
  try {
    const { problemId } = req.body;

    const user = await User.findById(req.user._id);

    // Remove if already there
    user.recentlyViewed = user.recentlyViewed.filter(
      (item) => item.problemId.toString() !== problemId
    );

    // Add new at top
    user.recentlyViewed.unshift({
      problemId,
      viewedAt: new Date(),
    });

    // Limit to 10 entries
    user.recentlyViewed = user.recentlyViewed.slice(0, 10);

    await user.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Recent view update failed" });
  }
};

// ---------------------- ADMIN: GET ALL USERS ----------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ message: "Failed to load users" });
  }
};
