import axios from "axios";

export const verifyLeetCodeSubmission = async (leetcodeUsername, targetSlug) => {
  try {
    const url = "https://leetcode.com/graphql";

    // Query for Recent ACCEPTED Submissions only
    const query = `
      query getRecentSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          titleSlug
          timestamp
        }
      }
    `;

    const variables = {
      username: leetcodeUsername,
      limit: 15 // Last 15 accepted problems
    };

    const response = await axios.post(url, { query, variables });
    const submissions = response.data?.data?.recentAcSubmissionList;

    if (!submissions || submissions.length === 0) return false;

    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const TWENTY_FOUR_HOURS = 24 * 60 * 60; 

    // 👇 FIX: Remove the trailing problem number from your local slug
    // Example: "two-sum-1" becomes "two-sum"
    // Example: "minimum-operations-to-make-a-uni-value-grid-2033" becomes "minimum-operations-to-make-a-uni-value-grid"
    const cleanTargetSlug = targetSlug.replace(/-\d+$/, "").toLowerCase();

    // Find if the target problem is in the list and solved within last 24 hrs
    const hasSolved = submissions.some((submission) => {
      const isSameProblem = submission.titleSlug.toLowerCase() === cleanTargetSlug;
      const isWithin24Hours = (now - Number(submission.timestamp)) <= TWENTY_FOUR_HOURS;
      
      return isSameProblem && isWithin24Hours;
    });

    return hasSolved;
  } catch (error) {
    console.error("LeetCode Verification Error:", error.message);
    return false;
  }
};





export const checkAnyRecentSubmission = async (leetcodeUsername) => {
  try {
    const url = "https://leetcode.com/graphql";
    const query = `
      query getRecentSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          title
          titleSlug
          timestamp
        }
      }
    `;

    // Limit 50 rakhte hain taaki din bhar ke cover ho jayein
    const variables = { username: leetcodeUsername, limit: 50 }; 
    const response = await axios.post(url, { query, variables });
    const submissions = response.data?.data?.recentAcSubmissionList;

    if (!submissions || submissions.length === 0) return null;

    // 🔥 NAYA LOGIC: Aaj raat 12:00 AM (IST) ka exact Unix Timestamp nikalna
    const now = new Date();
    const istDateStr = now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // Dega: "YYYY-MM-DD"
    const midnightIST = new Date(`${istDateStr}T00:00:00+05:30`); // Exact IST Midnight set kiya
    const startOfTodayTimestamp = Math.floor(midnightIST.getTime() / 1000); // Unix me convert kiya

    // 🔥 Sirf aaj 12:00 AM ke baad wale submissions filter karo
    const todaySubs = submissions.filter(
      (sub) => Number(sub.timestamp) >= startOfTodayTimestamp
    );

    if (todaySubs.length === 0) return null;

    return {
      count: todaySubs.length,       // 👈 Exact aaj ke total solved
      latestProblem: todaySubs[0],   // 👈 Sabse recent wala title
    };
  } catch (error) {
    console.error("LeetCode Daily Sync Error:", error.message);
    return null;
  }
};