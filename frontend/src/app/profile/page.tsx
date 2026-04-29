"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import {
  getProfile,
  getMyReports,
  getMyRequests,
  getMyRecentProblems,
  linkLeetcodeAccount,
  getMyLeetcodeStats,
  type LeetCodeData,
  unlinkLeetcodeAccount
} from "@/api/profile.api";
import { getMyHeatmap, syncDailyActivity, type HeatmapData } from "@/api/activity.api";

import ProfileHeader from "@/components/profile/ProfileHeader";
import RecentProblems from "@/components/profile/RecentProblems";
import MyRequests from "@/components/profile/MyRequests";
import MyReports from "@/components/profile/MyReports";
import ActivityHeatmap from "@/components/profile/ActivityHeatmap";

import type { UserProfile, MyReport, MyRequest, RecentView } from "@/types/profile";
import {
  User, Activity, MessageSquare, AlertTriangle, Code2,
  Link as LinkIcon, CheckCircle2, Loader2, Trophy, Clock, Shield, TrendingUp,
  RefreshCw,
  Zap,
  Unlink
} from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

// Import Recharts
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Custom API Error Interface to avoid 'any' or 'unknown'
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reports, setReports] = useState<MyReport[]>([]);
  const [requests, setRequests] = useState<MyRequest[]>([]);
  const [recent, setRecent] = useState<RecentView[]>([]);
  const [heatmap, setHeatmap] = useState<HeatmapData[]>([]);
  const [loading, setLoading] = useState(true);

  const [lcHandle, setLcHandle] = useState("");
  const [isLinking, setIsLinking] = useState(false);
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const [isUnlinking, setIsUnlinking] = useState(false);



  const [isSyncingDay, setIsSyncingDay] = useState(false);

  useEffect(() => {
    loadAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAllData = async () => {
    try {
      const [p, r, req, rec, h] = await Promise.all([
        getProfile(), getMyReports(), getMyRequests(), getMyRecentProblems(), getMyHeatmap(),
      ]);
      setProfile(p.user); setReports(r.reports); setRequests(req.requests); setRecent(rec.recent); setHeatmap(h.heatmap);
      if (p.user.socialLinks?.leetcode) fetchLcStats();
    } catch (e) {
      const err = e as ApiError;
      toast.error(parseError(err) || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchLcStats = async () => {
    setLoadingStats(true);
    try {
      const res = await getMyLeetcodeStats();
      setLcData(res.stats);
    } catch (e) {
      const err = e as ApiError;
      console.log("Failed to load LC stats", err.message);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLinkLeetcode = async () => {
    if (!lcHandle.trim()) {
      toast.error("Please enter a username!");
      return;
    }
    setIsLinking(true);
    try {
      const res = await linkLeetcodeAccount(lcHandle.trim());
      setProfile(res.user);
      toast.success(res.message);
      fetchLcStats();
    } catch (e) {
      const err = e as ApiError;
      toast.error(err.response?.data?.message || err.message || "Failed to link LeetCode");
    } finally {
      setIsLinking(false);
    }
  };


  const handleSyncMyDay = async () => {
    setIsSyncingDay(true);
    try {
      const res = await syncDailyActivity();
      toast.success(res.message, { icon: "🔥" });
      // Reload heatmap and profile stats so streak updates instantly!
      loadAllData();
    } catch (e) {
      const err = e as ApiError;
      toast.error(err.response?.data?.message || "Failed to sync day. Try solving a problem first!");
    } finally {
      setIsSyncingDay(false);
    }
  };



  const handleUnlinkLeetcode = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-sm text-foreground block mb-1">Disconnect LeetCode?</span>
            <span className="text-xs text-muted font-medium">
              You will no longer be able to 1-click sync your progress, and your rating will be removed from the Global Leaderboard.
            </span>
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            disabled={isUnlinking}
            className="px-3 py-1.5 text-xs font-bold rounded-lg border border-border-subtle text-muted hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              setIsUnlinking(true);
              try {
                const res = await unlinkLeetcodeAccount();
                setProfile(res.user);
                setLcData(null); // Clear the stats UI instantly
                toast.success(res.message);
              } catch (e: unknown) {
                const err = e as ApiError;
                toast.error(err.response?.data?.message || "Failed to disconnect");
              } finally {
                setIsUnlinking(false);
              }
            }}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            Yes, Disconnect
          </button>
        </div>
      </div>
    ), { duration: 8000, style: { maxWidth: '400px' } });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin relative z-10" />
          </div>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="text-center relative z-10 p-10 rounded-[2.5rem] bg-background-secondary/40 backdrop-blur-xl border border-border-subtle shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-3 text-foreground">Access Denied</h2>
            <p className="text-muted text-lg">Please log in to view your profile dashboard.</p>
          </div>
        </div>
      </>
    );
  }

  const hasLeetcode = !!profile.socialLinks?.leetcode;
  const getStat = (diff: string) => lcData?.solved?.find(s => s.difficulty === diff)?.count || 0;
  const totalSolved = getStat("All");
  const getPercentage = (diff: string) => totalSolved === 0 ? 0 : Math.round((getStat(diff) / totalSolved) * 100);

  const timeAgo = (timestamp: string) => {
    const seconds = Math.floor(Date.now() / 1000 - Number(timestamp));
    if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  // 👇 Peak Rating & Badge Logic 👇
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

      <div className="min-h-screen bg-background py-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none animate-float"></div>
        <div className="absolute bottom-1/4 right-0 w-125 h-125 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-6xl mx-auto px-6 mb-12 relative z-10">
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-wide uppercase">
              <User className="w-4 h-4" />
              Your Profile
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
              My <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">Dashboard</span>
            </h1>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto">
              Track your learning progress, manage community requests, and view your activity.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 space-y-10 relative z-10">
          <div className="animate-fade-in-up">
            <ProfileHeader user={profile} />
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <ActivityHeatmap data={heatmap} />
          </div>

          {/* 👇 LEETCODE STATS SECTION 👇 */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            {!hasLeetcode ? (
              // UNLINKED STATE
              <div className="relative rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-amber-500/30 p-8 overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                    <Code2 className="w-7 h-7 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-foreground tracking-tight">Link LeetCode Account</h3>
                    <p className="text-sm text-muted font-medium mt-1">Verify your POTD submissions automatically with 1-click!</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto relative z-10">
                  <input
                    type="text"
                    value={lcHandle}
                    onChange={(e) => setLcHandle(e.target.value)}
                    placeholder="Enter LeetCode username"
                    className="w-full md:w-64 px-4 py-3 bg-background border border-border-subtle rounded-xl text-sm font-bold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                  <button
                    onClick={handleLinkLeetcode}
                    disabled={isLinking}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 text-black font-black uppercase text-sm tracking-wider hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <LinkIcon className="w-4 h-4" />}
                    {isLinking ? "Verifying..." : "Connect"}
                  </button>
                </div>
              </div>
            ) : (
              // LINKED STATE
              <div className="relative rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-emerald-500/30 p-8 overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>

                {/* Header Row */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 relative z-10 border-b border-border-subtle/50 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 shadow-inner">
                      <Code2 className="w-7 h-7 text-emerald-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-extrabold text-foreground tracking-tight">LeetCode Mastery</h3>

                        {/* BADGE RENDERER */}
                        {lcBadge && (
                          <div className={`px-2.5 py-1 rounded-md ${lcBadge.bg} border ${lcBadge.border} flex items-center gap-1.5 shadow-sm`}>
                            <lcBadge.Icon className={`w-3.5 h-3.5 ${lcBadge.color}`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest ${lcBadge.color}`}>{lcBadge.title}</span>
                          </div>
                        )}

                        {!lcBadge && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase flex items-center gap-1 shadow-sm">
                            <CheckCircle2 className="w-3 h-3" /> Live
                          </span>
                        )}
                      </div>
                      <a href={`https://leetcode.com/u/${profile.socialLinks?.leetcode}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-muted hover:text-emerald-400 transition-colors mt-1 inline-block">
                        @{profile.socialLinks?.leetcode}
                      </a>

                      <button
                        onClick={handleUnlinkLeetcode}
                        disabled={isUnlinking}
                        className="text-[10px] font-bold text-red-500/70 hover:text-red-500 flex items-center gap-1 transition-colors bg-red-500/10 hover:bg-red-500/20 px-2 py-0.5 rounded-md"
                        title="Disconnect LeetCode Account"
                      >
                        <Unlink className="w-3 h-3" /> {isUnlinking ? "..." : "Unlink"}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-6 md:mt-0">
                    {loadingStats && <div className="text-sm font-bold text-emerald-500 flex items-center gap-2 animate-pulse"><Loader2 className="w-4 h-4 animate-spin" /> Fetching Stats...</div>}

                    <button
                      onClick={handleSyncMyDay}
                      disabled={isSyncingDay}
                      className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white font-black text-sm tracking-wider uppercase overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all disabled:opacity-70 disabled:hover:scale-100"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                      {isSyncingDay ? <RefreshCw className="w-4 h-4 animate-spin relative z-10" /> : <Zap className="w-4 h-4 relative z-10" />}
                      <span className="relative z-10">{isSyncingDay ? "Syncing..." : "Sync My Day"}</span>
                    </button>
                  </div>
                  {loadingStats && <div className="text-sm font-bold text-emerald-500 mt-4 md:mt-0 flex items-center gap-2 animate-pulse"><Loader2 className="w-4 h-4 animate-spin" /> Syncing with LC...</div>}
                </div>

                {lcData && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                    {/* LEFT COLUMN: Solved Stats & Recent */}
                    <div className="lg:col-span-5 space-y-6">

                      {/* Big Total & Difficulty Bars */}
                      <div className="p-6 rounded-3xl bg-background/50 border border-border-subtle shadow-inner">
                        <div className="flex justify-between items-end mb-6">
                          <div>
                            <div className="text-4xl font-black text-foreground">{totalSolved}</div>
                            <div className="text-xs font-bold text-muted uppercase tracking-widest mt-1">Total Solved</div>
                          </div>
                          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 flex items-center justify-center text-emerald-500 font-black text-sm">
                            LC
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

                      {/* Recent Submissions List */}
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

                      {/* Contest Metrics (Now includes Peak Rating) */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 shadow-inner">
                          <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Trophy className="w-3 h-3" /> Rating</div>
                          <div className="text-xl md:text-2xl font-black text-foreground">{currentRating || "N/A"}</div>
                        </div>

                        {/* Peak Rating */}
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

                      {/* Contest Rating Graph using Recharts */}
                      <div className="p-6 rounded-3xl bg-background/50 border border-border-subtle shadow-inner h-75 flex flex-col">
                        <h4 className="text-sm font-black text-foreground uppercase tracking-widest mb-4">Contest Rating History</h4>
                        {lcData.contestHistory && lcData.contestHistory.length > 0 ? (
                          <div className="flex-1 w-full text-xs font-bold">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={lcData.contestHistory} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                                <XAxis dataKey="date" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} minTickGap={30} />
                                <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                                <Tooltip
                                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontWeight: 'bold' }}
                                  itemStyle={{ color: '#a855f7' }}
                                  labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="rating"
                                  stroke="#a855f7"
                                  strokeWidth={3}
                                  dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
                                  activeDot={{ r: 6, fill: '#fff', stroke: '#a855f7' }}
                                  animationDuration={1500}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-center text-sm font-bold text-muted">
                            No contest history available yet.
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* High-Level Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {/* ... Keep your existing Stat Cards 1, 2, 3 ... */}
            <div className="relative rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-blue-500/20 p-8 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent opacity-50 pointer-events-none"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-bold text-muted uppercase tracking-wider">Problems Viewed</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
                <div className="text-5xl font-extrabold text-foreground">{recent.length}</div>
              </div>
            </div>

            <div className="relative rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-purple-500/20 p-8 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-50 pointer-events-none"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-bold text-muted uppercase tracking-wider">My Requests</span>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-500" />
                  </div>
                </div>
                <div className="text-5xl font-extrabold text-foreground">{requests.length}</div>
              </div>
            </div>

            <div className="relative rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-orange-500/20 p-8 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-transparent opacity-50 pointer-events-none"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-bold text-muted uppercase tracking-wider">My Reports</span>
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <div className="text-5xl font-extrabold text-foreground">{reports.length}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <RecentProblems recent={recent} />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <MyRequests requests={requests} />
            </div>
          </div>

          <div className="animate-fade-in-up pb-12" style={{ animationDelay: "0.5s" }}>
            <MyReports reports={reports} />
          </div>

        </div>
      </div>
    </>
  );
}