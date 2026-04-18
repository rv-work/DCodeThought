import User from "../models/User.js";
import Report from "../models/Report.js";
import Request from "../models/Request.js";
import ActivityLog from "../models/ActivityLog.js";
import CommunitySolution from "../models/CommunitySolution.js";

// 1. Get Logged-in User Profile (Updated to fetch fresh data)
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Failed to fetch profile" });
  }
};

// 2. Update Profile (Username, Bio, College, Socials)
export const updateProfile = async (req, res) => {
  try {
    const { username, bio, college, socialLinks } = req.body;

    // If username is being changed, check if it's unique
    if (username) {
      const usernameRegex = /^[a-zA-Z0-9_-]+$/;
      if (!usernameRegex.test(username)) {
        return res.status(400).json({ success: false, message: "Username can only contain letters, numbers, _, or -" });
      }
      const existing = await User.findOne({ username: username.toLowerCase(), _id: { $ne: req.user._id } });
      if (existing) {
        return res.status(400).json({ success: false, message: "Username is already taken!" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          ...(username && { username: username.toLowerCase() }),
          ...(bio !== undefined && { bio }),
          ...(college !== undefined && { college }),
          ...(socialLinks && { socialLinks }),
        }
      },
      { new: true }
    ).select("-password");

    return res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Failed to update profile" });
  }
};


export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({
      username: username.toLowerCase(),
    })
      .select(`
        _id
        name
        username
        email
        college
        bio
        socialLinks
        badges
        streaks
        reputation
        challenge
        dateOfJoining
        recentlyViewed
        friends
        mentor
      `)
      .populate("mentor", "name username")
      .populate("friends", "name username");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Heatmap Data
    const heatmapData = await ActivityLog.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: "$dateString",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { date: 1 } },
    ]);

    // Top Solutions
    const topSolutions = await CommunitySolution.find({
      userId: user._id,
    })
      .populate("problemId", "title slug difficulty type")
      .populate(
        "userId",
        "name username college badges reputation"
      )
      .sort({ "tagCounts.totalScore": -1 })
      .limit(3)
      .select("-code");

    // Total activity stats
    const totalActivities = await ActivityLog.countDocuments({
      userId: user._id,
    });

    const totalPracticeSolved = await ActivityLog.countDocuments({
      userId: user._id,
      type: "practice",
    });

    const totalPotdSolved = await ActivityLog.countDocuments({
      userId: user._id,
      type: "potd",
    });

    const totalContestParticipated = await ActivityLog.countDocuments({
      userId: user._id,
      type: "contest",
    });

    const totalFeedPosts = await ActivityLog.countDocuments({
      userId: user._id,
      type: "feed",
    });

    // Recent activity
    const recentActivity = await ActivityLog.find({
      userId: user._id,
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("type dateString createdAt");

    // Joined days ago
    const joinedDaysAgo = Math.floor(
      (Date.now() - new Date(user.dateOfJoining).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    // Friend count
    const friendCount = user.friends?.length || 0;

    // Profile completion score
    let profileCompletion = 0;

    if (user.name) profileCompletion += 10;
    if (user.username) profileCompletion += 10;
    if (user.bio) profileCompletion += 10;
    if (user.college) profileCompletion += 10;
    if (user.socialLinks?.github) profileCompletion += 10;
    if (user.socialLinks?.linkedin) profileCompletion += 10;
    if (user.socialLinks?.twitter) profileCompletion += 10;
    if (user.badges?.length > 0) profileCompletion += 10;
    if (friendCount > 0) profileCompletion += 10;
    if (user.challenge?.activeDays) profileCompletion += 10;


    return res.status(200).json({
      success: true,
      user,
      heatmap: heatmapData,
      topSolutions,

      stats: {
        totalActivities,
        totalPracticeSolved,
        totalPotdSolved,
        totalContestParticipated,
        totalFeedPosts,

        friendCount,
        joinedDaysAgo,
        profileCompletion,

        currentGeneralStreak: user.streaks?.currentGeneral || 0,
        maxGeneralStreak: user.streaks?.maxGeneral || 0,

        currentPotdStreak: user.streaks?.currentPotd || 0,
        maxPotdStreak: user.streaks?.maxPotd || 0,

        currentContestStreak: user.streaks?.currentContest || 0,
        maxContestStreak: user.streaks?.maxContest || 0,

        helpfulVotes: user.reputation?.helpful || 0,
        simplestVotes: user.reputation?.simplest || 0,
        creativeVotes: user.reputation?.creative || 0,
        totalThinkerScore: user.reputation?.totalThinkerScore || 0,

        badgeCount: user.badges?.length || 0,
        challengeProgress: user.challenge?.progress || 0,
        challengeGoal: user.challenge?.activeDays || null,
      },

      recentActivity,
    });
  } catch (error) {
    console.error("Get Public Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user._id })
      .populate("problemId", "title slug")
      .sort({ createdAt: -1 });

    return res.json({ success: true, reports });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to load reports",
    });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 });

    return res.json({ success: true, requests });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to load your requests",
    });
  }
};

export const getMyRecentProblems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "recentlyViewed.problemId",
      "problemNumber title slug difficulty"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const recent = user.recentlyViewed.filter((r) => r.problemId);

    return res.json({
      success: true,
      recent,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to load recent activity",
    });
  }
};












// Add or Remove a friend
export const toggleFriend = async (req, res) => {
  try {
    const { username } = req.params;
    
    // User cannot add themselves
    if (username.toLowerCase() === req.user.username?.toLowerCase()) {
      return res.status(400).json({ success: false, message: "You cannot add yourself as a friend." });
    }

    const friendToToggle = await User.findOne({ username: username.toLowerCase() });
    if (!friendToToggle) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const me = await User.findById(req.user._id);
    
    // Check if already friends
    const isAlreadyFriend = me.friends.includes(friendToToggle._id);

    if (isAlreadyFriend) {
      // Remove friend
      me.friends.pull(friendToToggle._id);
    } else {
      // Add friend
      me.friends.push(friendToToggle._id);
    }

    await me.save();

    return res.status(200).json({ 
      success: true, 
      isFriend: !isAlreadyFriend, 
      message: !isAlreadyFriend ? "Added to friends list!" : "Removed from friends." 
    });

  } catch (error) {
    console.error("Toggle Friend Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



// Get Multiple Users for Comparison
export const compareUsers = async (req, res) => {
  try {
    const { users } = req.query;
    if (!users) return res.status(400).json({ success: false, message: "No users provided for comparison." });

    const usernamesList = users.split(',').map(u => u.trim().toLowerCase()).filter(Boolean).slice(0, 3);

    if (usernamesList.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid usernames provided." });
    }

    // 👇 FETCHING LITERALLY EVERYTHING WE HAVE
    const usersData = await User.find({ username: { $in: usernamesList } })
      .select("name username college bio socialLinks badges streaks reputation challenge friends dateOfJoining recentlyViewed")
      .lean();

    const formattedUsers = usersData.map(u => ({
      ...u,
      problemsSolved: u.recentlyViewed ? u.recentlyViewed.length : 0,
      friendsCount: u.friends ? u.friends.length : 0, // Calculate friends count
      recentlyViewed: undefined, // Hide huge array to save bandwidth
      friends: undefined // Hide friends array IDs
    }));

    return res.status(200).json({ success: true, users: formattedUsers });
  } catch (error) {
    console.error("Compare Users Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};







export const joinChallenge = async (req, res) => {
  try {
    const { days, title, desc } = req.body;

    // Allow any duration between 7 and 365 days for custom quests
    if (!days || days < 7 || days > 365) {
      return res.status(400).json({ 
        success: false, 
        message: "Challenge must be between 7 and 365 days." 
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found." 
      });
    }

    // If user already has an active challenge, they can override it (progress resets)
    // Assign custom data or default to basic text for the standard presets
    user.challenge = {
      activeDays: days,
      title: title || `${days} Day Challenge`,
      desc: desc || "Committed to daily consistency.",
      startDate: new Date(),
      progress: 0
    };

    // Force Mongoose to recognize the nested object change
    user.markModified("challenge");
    await user.save();

    return res.status(200).json({ 
      success: true, 
      message: `Epic! You have accepted: ${user.challenge.title}. Let the grind begin!`,
      challenge: user.challenge
    });

  } catch (error) {
    console.error("Join Challenge Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};