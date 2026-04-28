"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import {
  getPublicProfileData,
  toggleFriendStatus,
  getPublicLeetcodeStats,
  type LeetCodeData
} from "@/api/profile.api";
import ActivityHeatmap from "@/components/profile/ActivityHeatmap";
import SolutionCard from "@/components/problems/Community/SolutionCard";
import {
  Medal, User as UserIcon, Calendar, Share2, Github, Linkedin, Twitter, ExternalLink,
  Code2, UserPlus, UserMinus, Flame, BrainCircuit, Target, Trophy, Activity,
  Star, Users, History, Terminal, Clock, Shield, TrendingUp
} from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";
import type { PublicProfileResponse, TopSolution, ActivityLogEntry } from "@/types/profile";
import { useAuth } from "@/hooks/useAuth";

// Import Recharts
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ApiError {
  response?: { data?: { message?: string; } };
  message?: string;
}

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { user: currentUser } = useAuth();

  const [data, setData] = useState<PublicProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [isToggling, setIsToggling] = useState<boolean>(false);

  // LeetCode States
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);
  const [loadingLc, setLoadingLc] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getPublicProfileData(username);
        setData(res);

        if (currentUser && currentUser.friends && res.user) {
          setIsFriend(currentUser.friends.includes(res.user._id));
        }

        // Fetch LC Stats if linked
        if (res.user?.socialLinks?.leetcode) {
          fetchLcStats(username);
        }

      } catch (e) {
        const err = e as ApiError;
        toast.error(parseError(err));
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchProfile();
  }, [username, currentUser]);

  const fetchLcStats = async (uname: string) => {
    setLoadingLc(true);
    try {
      const res = await getPublicLeetcodeStats(uname);
      setLcData(res.stats);
    } catch (e) {
      const err = e as ApiError;
      toast.error(parseError(err));
      console.log("User LC stats not public or failed to load");
    } finally {
      setLoadingLc(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Profile link copied to clipboard!");
  };

  const handleToggleFriend = async () => {
    if (!currentUser) return toast.error("Please login to add friends!");
    setIsToggling(true);
    try {
      const res = await toggleFriendStatus(username);
      setIsFriend(res.isFriend);
      toast.success(res.message);
    } catch (e) {
      const err = e as ApiError;
      toast.error(parseError(err));
    } finally {
      setIsToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!data || !data.user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center">
        <h1 className="text-4xl font-extrabold text-foreground mb-4">404 - Coder Not Found</h1>
        <Link href="/" className="px-6 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all">Go Home</Link>
      </div>
    );
  }

  const { user, heatmap, topSolutions, stats, recentActivity } = data;
  const hasLeetcode = !!user.socialLinks?.leetcode;

  // LC Helpers
  const getStat = (diff: string) => lcData?.solved?.find(s => s.difficulty === diff)?.count || 0;
  const totalSolved = getStat("All");
  const getPercentage = (diff: string) => totalSolved === 0 ? 0 : Math.round((getStat(diff) / totalSolved) * 100);

  const timeAgo = (timestamp: string) => {
    const seconds = Math.floor(Date.now() / 1000 - Number(timestamp));
    if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const currentRating = Math.round(lcData?.contest?.rating || 0);
  const peakRating = lcData?.contestHistory?.length
    ? Math.max(...lcData.contestHistory.map(c => c.rating), currentRating)
    : currentRating;

  const getBadge = (rating: number) => {
    if (rating >= 2150) return { title: "Guardian", color: "text-rose-500", bg: "bg-rose-500/20", border: "border-rose-500/50", Icon: Shield };
    if (rating >= 1850) return { title: "Knight", color: "text-amber-500", bg: "bg-amber-500/20", border: "border-amber-500/50", Icon: Shield };
    return null;
  };
  const lcBadge = getBadge(peakRating);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-200 h-100 bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 pt-16 relative z-10 animate-fade-in-up">

          {/* HERO BANNER */}
          <div className="relative rounded-[2.5rem] bg-background-secondary/40 backdrop-blur-2xl border border-border-subtle p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="relative">
              <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-[2.5rem] bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center text-6xl font-black text-white shadow-[0_0_50px_rgba(168,85,247,0.3)] rotate-3 hover:rotate-0 transition-all duration-500 border-4 border-background/50">
                {user.name.charAt(0).toUpperCase()}
              </div>
              {user.badges?.includes("Top_Thinker") && (
                <div className="absolute -bottom-4 -right-4 bg-amber-500 border-4 border-background text-white p-3 rounded-full shadow-xl animate-bounce" title="Top Thinker">
                  <Trophy className="w-6 h-6" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left w-full flex flex-col justify-between">
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">{user.name}</h1>
                    <p className="text-xl text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400 font-bold mt-1">@{user.username}</p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    {user.socialLinks?.github && <a href={user.socialLinks.github} target="_blank" rel="noreferrer" className="p-3 bg-background/50 rounded-xl hover:text-white hover:bg-white/10 transition"><Github className="w-5 h-5" /></a>}
                    {user.socialLinks?.linkedin && <a href={user.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-background/50 rounded-xl hover:text-blue-400 hover:bg-blue-500/20 transition"><Linkedin className="w-5 h-5" /></a>}
                    {user.socialLinks?.twitter && <a href={user.socialLinks.twitter} target="_blank" rel="noreferrer" className="p-3 bg-background/50 rounded-xl hover:text-sky-400 hover:bg-sky-500/20 transition"><Twitter className="w-5 h-5" /></a>}
                    <button onClick={handleShare} className="p-3 bg-background/50 rounded-xl hover:text-purple-400 hover:bg-purple-500/20 transition"><Share2 className="w-5 h-5" /></button>
                  </div>
                </div>

                <p className="text-muted text-lg max-w-2xl leading-relaxed mt-4">{user.bio || "Currently compiling code... no bio yet."}</p>

                {/* Profile Completion Bar */}
                {currentUser?.username === user.username && (
                  <div className="mt-4 max-w-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-muted uppercase tracking-wider">Profile Strength</span>
                      <span className="text-xs font-bold text-purple-400">{stats.profileCompletion}%</span>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border-subtle">
                      <div className="h-full bg-linear-to-r from-purple-500 to-blue-500 transition-all duration-1000" style={{ width: `${stats.profileCompletion}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-semibold text-muted pt-4 border-t border-border-subtle/50">
                {user.college && <span className="flex items-center gap-1.5"><UserIcon className="w-4 h-4 text-purple-400" /> {user.college}</span>}
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> {stats.friendCount} Connections</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-400" /> Joined {stats.joinedDaysAgo} days ago</span>

                {currentUser && currentUser.username !== user.username && (
                  <button onClick={handleToggleFriend} disabled={isToggling} className={`ml-auto flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-extrabold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 ${isFriend ? "bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20" : "bg-linear-to-r from-purple-600 to-blue-600 text-white hover:scale-[1.02]"}`}>
                    {isFriend ? <><UserMinus className="w-4 h-4" /> Unfriend</> : <><UserPlus className="w-4 h-4" /> Connect</>}
                  </button>
                )}
              </div>
            </div>
          </div>


          {/* 👇 LEETCODE STATS SECTION (PUBLIC VIEW) 👇 */}
          <div className="animate-fade-in-up mt-6" style={{ animationDelay: "0.15s" }}>
            {hasLeetcode && !loadingLc && lcData && (
              <div className="relative rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-emerald-500/30 p-8 overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 relative z-10 border-b border-border-subtle/50 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 shadow-inner">
                      <Code2 className="w-7 h-7 text-emerald-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-extrabold text-foreground tracking-tight">LeetCode Mastery</h3>

                        {lcBadge && (
                          <div className={`px-2.5 py-1 rounded-md ${lcBadge.bg} border ${lcBadge.border} flex items-center gap-1.5 shadow-sm`}>
                            <lcBadge.Icon className={`w-3.5 h-3.5 ${lcBadge.color}`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest ${lcBadge.color}`}>{lcBadge.title}</span>
                          </div>
                        )}
                      </div>
                      <a href={`https://leetcode.com/u/${user.socialLinks?.leetcode}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-muted hover:text-emerald-400 transition-colors mt-1 inline-block">
                        @{user.socialLinks?.leetcode}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                  {/* LEFT COLUMN: Solved Stats & Recent */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="p-6 rounded-3xl bg-background/50 border border-border-subtle shadow-inner">
                      <div className="flex justify-between items-end mb-6">
                        <div>
                          <div className="text-4xl font-black text-foreground">{totalSolved}</div>
                          <div className="text-xs font-bold text-muted uppercase tracking-widest mt-1">Total Solved</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-emerald-500">Easy</span>
                            <span className="text-muted">{getStat("Easy")}</span>
                          </div>
                          <div className="w-full h-2 bg-emerald-500/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${getPercentage("Easy")}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-amber-500">Medium</span>
                            <span className="text-muted">{getStat("Medium")}</span>
                          </div>
                          <div className="w-full h-2 bg-amber-500/10 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: `${getPercentage("Medium")}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-rose-500">Hard</span>
                            <span className="text-muted">{getStat("Hard")}</span>
                          </div>
                          <div className="w-full h-2 bg-rose-500/10 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(225,29,72,0.5)]" style={{ width: `${getPercentage("Hard")}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-background/50 border border-border-subtle shadow-inner">
                      <h4 className="text-sm font-black text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-500" /> Recent Solves
                      </h4>
                      <div className="space-y-3">
                        {lcData.recentSubmissions.length > 0 ? lcData.recentSubmissions.map((sub, i) => (
                          <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                            <span className="text-sm font-bold text-foreground truncate max-w-45">{sub.title}</span>
                            <span className="text-xs font-medium text-muted shrink-0">{timeAgo(sub.timestamp)}</span>
                          </div>
                        )) : (
                          <p className="text-xs text-muted text-center py-4">No recent submissions found.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Contest Stats & Graph */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 shadow-inner">
                        <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Trophy className="w-3 h-3" /> Rating</div>
                        <div className="text-xl md:text-2xl font-black text-foreground">{currentRating || "N/A"}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-inner">
                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Peak</div>
                        <div className="text-xl md:text-2xl font-black text-foreground">{Math.round(peakRating) || "N/A"}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-background/50 border border-border-subtle">
                        <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Global Rank</div>
                        <div className="text-xl font-black text-foreground">{lcData.contest?.globalRanking?.toLocaleString() || "N/A"}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-background/50 border border-border-subtle">
                        <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Top %</div>
                        <div className="text-xl font-black text-foreground">{lcData.contest?.topPercentage ? `${lcData.contest.topPercentage}%` : "N/A"}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-background/50 border border-border-subtle">
                        <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Attended</div>
                        <div className="text-xl font-black text-foreground">{lcData.contest?.attendedContestsCount || 0}</div>
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-background/50 border border-border-subtle shadow-inner h-75 flex flex-col">
                      <h4 className="text-sm font-black text-foreground uppercase tracking-widest mb-4">Contest Rating History</h4>
                      {lcData.contestHistory && lcData.contestHistory.length > 0 ? (
                        <div className="flex-1 w-full text-xs font-bold">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lcData.contestHistory} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                              <XAxis dataKey="date" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} minTickGap={30} />
                              <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                              <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontWeight: 'bold' }} itemStyle={{ color: '#a855f7' }} labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }} />
                              <Line type="monotone" dataKey="rating" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#fff', stroke: '#a855f7' }} animationDuration={1500} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-sm font-bold text-muted">No contest history available.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* BENTO GRID STATS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">

            {/* Platform Activity (Span 4) */}
            <div className="md:col-span-4 bg-background-secondary/40 backdrop-blur-xl border border-border-subtle p-6 rounded-4xl hover:border-emerald-500/30 transition-colors">
              <h3 className="text-sm font-extrabold text-muted uppercase tracking-wider flex items-center gap-2 mb-6"><Terminal className="w-5 h-5 text-emerald-400" /> Platform Activity</h3>
              <div className="flex items-end justify-between mb-6">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-500">{stats.totalActivities}</span>
                <span className="text-sm font-bold text-emerald-500/70 mb-1">Total Actions</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background/50 rounded-2xl p-3 border border-border-subtle/50 flex flex-col">
                  <span className="text-[10px] text-muted uppercase font-bold mb-1">Practice</span>
                  <span className="font-black text-xl text-foreground">{stats.totalPracticeSolved}</span>
                </div>
                <div className="bg-background/50 rounded-2xl p-3 border border-border-subtle/50 flex flex-col">
                  <span className="text-[10px] text-muted uppercase font-bold mb-1">POTD</span>
                  <span className="font-black text-xl text-foreground">{stats.totalPotdSolved}</span>
                </div>
                <div className="bg-background/50 rounded-2xl p-3 border border-border-subtle/50 flex flex-col">
                  <span className="text-[10px] text-muted uppercase font-bold mb-1">Contests</span>
                  <span className="font-black text-xl text-foreground">{stats.totalContestParticipated}</span>
                </div>
                <div className="bg-background/50 rounded-2xl p-3 border border-border-subtle/50 flex flex-col">
                  <span className="text-[10px] text-muted uppercase font-bold mb-1">Posts</span>
                  <span className="font-black text-xl text-foreground">{stats.totalFeedPosts}</span>
                </div>
              </div>
            </div>

            {/* Streaks Box (Span 4) */}
            <div className="md:col-span-4 bg-background-secondary/40 backdrop-blur-xl border border-border-subtle p-6 rounded-4xl hover:border-orange-500/30 transition-colors flex flex-col justify-between">
              <h3 className="text-sm font-extrabold text-muted uppercase tracking-wider flex items-center gap-2 mb-6"><Flame className="w-5 h-5 text-orange-500" /> Active Streaks</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                  <div className="flex flex-col">
                    <span className="font-bold text-orange-400">🔥 General Coding</span>
                    <span className="text-[11px] font-bold text-orange-400/70 uppercase tracking-wide mt-0.5">Best: {stats.maxGeneralStreak}</span>
                  </div>
                  <span className="text-2xl font-black text-orange-500">{stats.currentGeneralStreak} <span className="text-sm">d</span></span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex flex-col">
                    <span className="font-bold text-blue-400">🎯 POTD Solver</span>
                    <span className="text-[11px] font-bold text-blue-400/70 uppercase tracking-wide mt-0.5">Best: {stats.maxPotdStreak}</span>
                  </div>
                  <span className="text-2xl font-black text-blue-500">{stats.currentPotdStreak} <span className="text-sm">d</span></span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex flex-col">
                    <span className="font-bold text-emerald-400">⚔️ Contests</span>
                    <span className="text-[11px] font-bold text-emerald-400/70 uppercase tracking-wide mt-0.5">Best: {stats.maxContestStreak}</span>
                  </div>
                  <span className="text-2xl font-black text-emerald-500">{stats.currentContestStreak} <span className="text-sm">d</span></span>
                </div>
              </div>
            </div>

            {/* Reputation Box (Span 4) */}
            <div className="md:col-span-4 bg-background-secondary/40 backdrop-blur-xl border border-border-subtle p-6 rounded-4xl hover:border-purple-500/30 transition-colors">
              <h3 className="text-sm font-extrabold text-muted uppercase tracking-wider flex items-center gap-2 mb-6"><BrainCircuit className="w-5 h-5 text-purple-400" /> Community Reputation</h3>
              <div className="flex items-end justify-between mb-6">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">{stats.totalThinkerScore}</span>
                <span className="text-sm font-bold text-purple-500/70 mb-1">Total Score</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-background/50 rounded-2xl p-3 text-center border border-border-subtle/50"><Star className="w-4 h-4 mx-auto mb-1 text-amber-400" /><p className="font-black text-lg">{stats.helpfulVotes}</p><p className="text-[10px] text-muted uppercase font-bold">Helpful</p></div>
                <div className="bg-background/50 rounded-2xl p-3 text-center border border-border-subtle/50"><Target className="w-4 h-4 mx-auto mb-1 text-blue-400" /><p className="font-black text-lg">{stats.simplestVotes}</p><p className="text-[10px] text-muted uppercase font-bold">Simple</p></div>
                <div className="bg-background/50 rounded-2xl p-3 text-center border border-border-subtle/50"><Activity className="w-4 h-4 mx-auto mb-1 text-pink-400" /><p className="font-black text-lg">{stats.creativeVotes}</p><p className="text-[10px] text-muted uppercase font-bold">Creative</p></div>
              </div>
            </div>

          </div>

          {/* LOWER GRID: Heatmap & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

            {/* Heatmap (Takes up 2 columns on large screens) */}
            <div className="lg:col-span-2 bg-background-secondary/40 backdrop-blur-xl border border-border-subtle p-8 rounded-4xl">
              <ActivityHeatmap data={heatmap} />

              {/* Challenge Box embedded below heatmap to save space */}
              <div className="mt-8 pt-8 border-t border-border-subtle">
                <h3 className="text-sm font-extrabold text-muted uppercase tracking-wider flex items-center gap-2 mb-4"><Target className="w-5 h-5 text-pink-500" /> Current Challenge</h3>
                {stats.challengeGoal ? (
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <h4 className="text-xl font-black text-foreground">{user.challenge?.title || "Standard Challenge"}</h4>
                        {user.challenge?.desc && <p className="text-sm text-muted mt-1 font-medium">{user.challenge.desc}</p>}
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-foreground">{stats.challengeProgress}</span>
                        <span className="text-sm font-bold text-muted mb-1">/ {stats.challengeGoal} Days</span>
                      </div>
                    </div>
                    <div className="w-full h-4 bg-background rounded-full overflow-hidden border border-border-subtle">
                      <div className="h-full bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-1000 relative" style={{ width: `${(stats.challengeProgress / stats.challengeGoal) * 100}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="py-4 flex items-center justify-center text-muted/50 font-bold italic border-2 border-dashed border-border-subtle rounded-2xl">
                    No active challenge right now.
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-background-secondary/40 backdrop-blur-xl border border-border-subtle p-6 rounded-4xl flex flex-col">
              <h3 className="text-sm font-extrabold text-muted uppercase tracking-wider flex items-center gap-2 mb-6"><History className="w-5 h-5 text-blue-400" /> Recent Log</h3>

              <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-100 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
                {recentActivity && recentActivity.length > 0 ? (
                  recentActivity.map((log: ActivityLogEntry, i: number) => (
                    <div key={log._id || i} className="flex gap-4 items-start relative">
                      {i !== recentActivity.length - 1 && (
                        <div className="absolute left-2.5 top-8 -bottom-4 w-0.5 bg-border-subtle" />
                      )}
                      <div className="w-5 h-5 rounded-full shrink-0 mt-1 flex items-center justify-center bg-background border-2 border-purple-500">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground capitalize">
                          {log.type === "potd" ? "Solved Problem of the Day" :
                            log.type === "practice" ? "Practiced a Problem" :
                              log.type === "contest" ? "Participated in Contest" :
                                log.type === "feed" ? "Created a Post" : "Action Performed"}
                        </p>
                        <p className="text-xs text-muted font-medium mt-0.5">
                          {new Date(log.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-sm text-center italic mt-10">No recent activity found.</p>
                )}
              </div>
            </div>

          </div>

          {/* TOP SOLUTIONS SHOWCASE */}
          {topSolutions && topSolutions.length > 0 && (
            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-4 mb-8 px-2 border-b border-border-subtle pb-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                  <Medal className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground">Top Contributions</h2>
                  <p className="text-muted text-sm mt-1">Highest rated explanations by the community</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {topSolutions.map((sol: TopSolution) => (
                  <div key={sol._id} className="relative group">
                    <div className="mb-3 px-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-bold text-muted uppercase tracking-wider">Solution for:</span>
                        <Link href={`/problems/${sol.problemId.slug}`} className="text-sm font-extrabold text-foreground hover:text-purple-400 transition-colors">
                          {sol.problemId.title}
                        </Link>
                      </div>
                      <Link href={`/problems/${sol.problemId.slug}`} className="flex items-center gap-1 text-xs font-bold text-purple-400 hover:text-purple-300">
                        View Problem <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="ring-1 ring-border-subtle group-hover:ring-purple-500/50 rounded-3xl transition-all duration-300 shadow-sm group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] bg-background">
                      <SolutionCard solution={sol} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}