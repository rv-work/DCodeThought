import axios from "axios";

export const verifyLeetCodeSubmission = async (leetcodeUsername, targetSlug) => {
  try {
    const url = "https://leetcode.com/graphql";
    const query = `
      query getRecentSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          titleSlug
          timestamp
        }
      }
    `;

    const variables = { username: leetcodeUsername, limit: 15 };
    const response = await axios.post(url, { query, variables });
    const submissions = response.data?.data?.recentAcSubmissionList;

    if (!submissions || submissions.length === 0) return false;

    // 🔥 FIX: 5:30 AM IST (00:00 UTC) Exact Boundary
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0); 
    const startOfTodayTimestamp = Math.floor(startOfToday.getTime() / 1000);

    const cleanTargetSlug = targetSlug.replace(/-\d+$/, "").toLowerCase();

    const hasSolved = submissions.some((submission) => {
      const isSameProblem = submission.titleSlug.toLowerCase() === cleanTargetSlug;
      // Ab check karega ki submission 5:30 AM ke baad ka hai ya nahi
      const isToday = Number(submission.timestamp) >= startOfTodayTimestamp; 
      
      return isSameProblem && isToday;
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

    const variables = { username: leetcodeUsername, limit: 50 }; 
    const response = await axios.post(url, { query, variables });
    const submissions = response.data?.data?.recentAcSubmissionList;

    if (!submissions || submissions.length === 0) return null;

    // 🔥 FIX: 5:30 AM IST (00:00 UTC) Exact Boundary
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);
    const startOfTodayTimestamp = Math.floor(startOfToday.getTime() / 1000);

    const todaySubs = submissions.filter(
      (sub) => Number(sub.timestamp) >= startOfTodayTimestamp
    );

    if (todaySubs.length === 0) return null;

    return {
      count: todaySubs.length,       
      latestProblem: todaySubs[0],   
    };
  } catch (error) {
    console.error("LeetCode Daily Sync Error:", error.message);
    return null;
  }
};