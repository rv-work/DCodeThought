import axios from "axios";

export const fetchLeetCodeStats = async (username) => {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          topPercentage
        }
        userContestRankingHistory(username: $username) {
          attended
          rating
          contest {
            title
            startTime
          }
        }
        recentAcSubmissionList(username: $username, limit: 5) {
          title
          titleSlug
          timestamp
        }
      }
    `;
    
    const response = await axios.post("https://leetcode.com/graphql", { 
      query, 
      variables: { username } 
    });

    const data = response.data?.data;
    if (!data || !data.matchedUser) return null;

    // Filter out un-attended contests for the graph
    const contestHistory = data.userContestRankingHistory
      ?.filter(c => c.attended === true)
      .map(c => ({
        name: c.contest.title,
        rating: Math.round(c.rating),
        date: new Date(c.contest.startTime * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      })) || [];

    return {
      solved: data.matchedUser.submitStats.acSubmissionNum,
      contest: data.userContestRanking || null,
      recentSubmissions: data.recentAcSubmissionList || [],
      contestHistory
    };
  } catch (error) {
    console.error("LeetCode Stats Error:", error.message);
    return null;
  }
};