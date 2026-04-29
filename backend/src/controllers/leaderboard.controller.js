import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";
import CommunitySolution from "../models/CommunitySolution.js";

export const getLeaderboard = async (req, res) => {
  try {
    const { 
      tab = "streak", 
      limit = 50,
      page = 1, // 
      time = "all_time", 
      streakType = "general", 
      challengeDays = 100, 
      collegeName = "" 
    } = req.query;
    
    const parsedLimit = parseInt(limit) || 50;
    const parsedPage = parseInt(page) || 1;
    const skip = (parsedPage - 1) * parsedLimit; 

    let leaderboard = [];

    // ---------------------------------------------------------
    // 1. STREAK LEADERBOARD
    // ---------------------------------------------------------
    if (tab === "streak") {
      let streakField = "streaks.maxGeneral";
      if (streakType === "potd") streakField = "streaks.maxPotd";
      if (streakType === "contest") streakField = "streaks.maxContest";

      let query = { [streakField]: { $gt: 0 } };
      if (collegeName) query.college = collegeName;

      leaderboard = await User.find(query)
        .select("name username college streaks badges challenge")
        .sort({ [streakField]: -1 })
        .skip(skip) // 👈
        .limit(parsedLimit);

    // ---------------------------------------------------------
    // 2. BEST THINKER
    // ---------------------------------------------------------
    } else if (tab === "thinker") {
      if (time === "all_time") {
        leaderboard = await User.find({ "reputation.totalThinkerScore": { $gt: 0 } })
          .select("name username college reputation badges")
          .sort({ "reputation.totalThinkerScore": -1 })
          .skip(skip) // 👈
          .limit(parsedLimit);
      } else {
        const dateLimit = new Date();
        if (time === "this_week") dateLimit.setDate(dateLimit.getDate() - 7);
        if (time === "this_month") dateLimit.setMonth(dateLimit.getMonth() - 1);

        leaderboard = await CommunitySolution.aggregate([
          { $match: { createdAt: { $gte: dateLimit } } },
          { $group: { _id: "$userId", periodScore: { $sum: "$tagCounts.totalScore" } } },
          { $match: { periodScore: { $gt: 0 } } },
          { $sort: { periodScore: -1 } },
          { $skip: skip }, // 👈
          { $limit: parsedLimit },
          { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
          { $unwind: "$user" },
          { $project: { _id: "$user._id", name: "$user.name", username: "$user.username", college: "$user.college", badges: "$user.badges", periodScore: 1 }}
        ]);
      }

    // ---------------------------------------------------------
    // 3. COLLEGE RANKING
    // ---------------------------------------------------------
    } else if (tab === "college") {
      leaderboard = await User.aggregate([
        { $match: { college: { $nin: [null, ""] } } },
        { $group: { _id: "$college", totalStreakScore: { $sum: "$streaks.maxGeneral" }, studentCount: { $sum: 1 } } },
        { $sort: { totalStreakScore: -1 } },
        { $skip: skip }, // 👈
        { $limit: parsedLimit },
        { $project: { collegeName: "$_id", totalStreakScore: 1, studentCount: 1, _id: 0 } }
      ]);

    // ---------------------------------------------------------
    // 4. RISING CODERS
    // ---------------------------------------------------------
    } else if (tab === "rising") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      leaderboard = await ActivityLog.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        { $group: { _id: "$userId", recentSolvedCount: { $sum: 1 } } },
        { $sort: { recentSolvedCount: -1 } },
        { $skip: skip }, // 👈
        { $limit: parsedLimit },
        { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
        { $unwind: "$user" },
        { $project: { _id: "$user._id", name: "$user.name", username: "$user.username", college: "$user.college", badges: "$user.badges", recentSolvedCount: 1 }}
      ]);

    // ---------------------------------------------------------
    // 5. CHALLENGES & NEWLY JOINED
    // ---------------------------------------------------------
    } else if (tab === "challenge") {
      let challengeLimit = 50; 
      const days = Number(challengeDays);
      if (days === 365) challengeLimit = 50;
      else if (days === 200) challengeLimit = 30;
      else if (days === 100) challengeLimit = 25;
      else if (days === 50) challengeLimit = 15;
      else if (days === 30) challengeLimit = 10;

      // Note: Challenges have strict top limits, so pagination doesn't apply the same way, but we pass skip just in case
      leaderboard = await User.find({ "challenge.activeDays": days, "challenge.progress": { $gt: 0 } })
        .select("name username college challenge badges")
        .sort({ "challenge.progress": -1 })
        .skip(skip)
        .limit(Math.min(challengeLimit, parsedLimit));



        
    } else if (tab === "newly_joined") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      leaderboard = await User.find({ "challenge.startDate": { $gte: sevenDaysAgo } })
        .select("name username college challenge badges")
        .sort({ "challenge.startDate": -1 })
        .skip(skip) // 👈
        .limit(parsedLimit);
    
    
    // ---------------------------------------------------------
    // 6. LEETCODE CONTEST RATING
    // ---------------------------------------------------------
    } else if (tab === "leetcode") {
      leaderboard = await User.find({ leetcodeRating: { $gt: 0 } })
        .select("name username college badges leetcodeRating socialLinks")
        .sort({ leetcodeRating: -1 })
        .skip(skip)
        .limit(parsedLimit);
    } else {
      return res.status(400).json({ success: false, message: "Invalid leaderboard tab" });
    }
    

    // Determine if there are more records
    const hasMore = leaderboard.length === parsedLimit;

    return res.status(200).json({ success: true, tab, hasMore, data: leaderboard });
  } catch (error) {
    console.error("Leaderboard Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};







// Get Private Leaderboard (Only Me + My Friends)
export const getFriendsLeaderboard = async (req, res) => {
  try {
    const me = await User.findById(req.user._id);
    if (!me) return res.status(404).json({ success: false, message: "User not found" });

    // Create an array of IDs: My friends + My own ID (to rank myself among them)
    const leaderboardIds = [...me.friends, me._id];

    const leaderboard = await User.find({ _id: { $in: leaderboardIds } })
      .select("name username college streaks badges")
      .sort({ "streaks.maxGeneral": -1 }); // Default sorting by general streak

    return res.status(200).json({
      success: true,
      tab: "friends",
      hasMore: false, // Friends list is usually small, no pagination needed for now
      data: leaderboard,
    });
  } catch (error) {
    console.error("Friends Leaderboard Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};





export const searchUsersForFriends = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res.status(200).json({ success: true, users: [] });
    }

    const regex = new RegExp(q, "i"); // Case-insensitive regex search
    const me = await User.findById(req.user._id);

    // Find users matching name or username (exclude the current user)
    const users = await User.find({
      _id: { $ne: req.user._id },
      $or: [{ name: regex }, { username: regex }]
    })
      .select("_id name username badges")
      .limit(10);

    // Map the results to include an 'isFriend' boolean
    const mappedUsers = users.map((u) => ({
      _id: u._id,
      name: u.name,
      username: u.username,
      badges: u.badges,
      isFriend: me.friends.includes(u._id)
    }));

    return res.status(200).json({ success: true, users: mappedUsers });
  } catch (error) {
    console.error("Search Users Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};