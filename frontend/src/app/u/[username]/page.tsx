"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { getPublicProfileData, toggleFriendStatus } from "@/api/profile.api";
import ActivityHeatmap from "@/components/profile/ActivityHeatmap";
import SolutionCard from "@/components/problems/Community/SolutionCard";
import {
  Medal, User as UserIcon, Calendar, Share2, Github, Linkedin, ExternalLink,
  Code2, UserPlus, UserMinus, Flame, BrainCircuit, Target, Shield, Trophy, Activity, Star
} from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";
import type { PublicProfileResponse, TopSolution } from "@/types/profile";
import { useAuth } from "@/hooks/useAuth";

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { user: currentUser } = useAuth();

  const [data, setData] = useState<PublicProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [isToggling, setIsToggling] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getPublicProfileData(username);
        setData(res);

        if (currentUser && currentUser.friends && res.user) {
          setIsFriend(currentUser.friends.includes(res.user._id));
        }
      } catch (err) {
        toast.error(parseError(err));
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchProfile();
  }, [username, currentUser]);

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
    } catch (err) {
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

  const { user, heatmap, topSolutions } = data;

  // Safe Object Destructuring so TS doesn't complain about undefined properties
  const rep = user.reputation || { helpful: 0, simplest: 0, creative: 0, totalThinkerScore: 0 };
  const streaks = user.streaks || { currentGeneral: 0, maxGeneral: 0, currentPotd: 0, currentContest: 0 };
  const challenge = user.challenge || { activeDays: null, progress: 0 };

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

            <div className="flex-1 text-center md:text-left space-y-4 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">{user.name}</h1>
                  <p className="text-xl text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400 font-bold mt-1">@{user.username}</p>
                </div>
                <div className="flex gap-3 justify-center">
                  {user.socialLinks?.github && <a href={user.socialLinks.github} target="_blank" rel="noreferrer" className="p-3 bg-background/50 rounded-xl hover:text-white hover:bg-white/10 transition"><Github className="w-5 h-5" /></a>}
                  {user.socialLinks?.linkedin && <a href={user.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-background/50 rounded-xl hover:text-blue-400 hover:bg-blue-500/20 transition"><Linkedin className="w-5 h-5" /></a>}
                  <button onClick={handleShare} className="p-3 bg-background/50 rounded-xl hover:text-purple-400 hover:bg-purple-500/20 transition"><Share2 className="w-5 h-5" /></button>
                </div>
              </div>

              <p className="text-muted text-lg max-w-2xl leading-relaxed">{user.bio || "Currently compiling code... no bio yet."}</p>

              {user.badges && user.badges.length > 0 && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                  {user.badges.map(b => (
                    <span key={b} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <Shield className="w-3 h-3" /> {b.replace("_", " ")}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-semibold text-muted pt-4 border-t border-border-subtle/50">
                {user.college && <span className="flex items-center gap-1.5"><UserIcon className="w-4 h-4 text-purple-400" /> {user.college}</span>}
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-400" /> Joined {new Date(user.dateOfJoining).getFullYear()}</span>
              </div>

              {currentUser && currentUser.username !== user.username && (
                <div className="pt-2 flex justify-center md:justify-start">
                  <button onClick={handleToggleFriend} disabled={isToggling} className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-extrabold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 ${isFriend ? "bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/20" : "bg-linear-to-r from-purple-600 to-blue-600 text-white hover:scale-[1.02]"}`}>
                    {isFriend ? <><UserMinus className="w-5 h-5" /> Unfriend</> : <><UserPlus className="w-5 h-5" /> Add Friend</>}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BENTO GRID STATS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">

            {/* Reputation Box (Span 4) */}
            <div className="md:col-span-4 bg-background-secondary/40 backdrop-blur-xl border border-border-subtle p-6 rounded-4xl hover:border-purple-500/30 transition-colors">
              <h3 className="text-sm font-extrabold text-muted uppercase tracking-wider flex items-center gap-2 mb-6"><BrainCircuit className="w-5 h-5 text-purple-400" /> Community Reputation</h3>
              <div className="flex items-end justify-between mb-6">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">{rep.totalThinkerScore || 0}</span>
                <span className="text-sm font-bold text-purple-500/70 mb-1">Total Score</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-background/50 rounded-2xl p-3 text-center border border-border-subtle/50"><Star className="w-4 h-4 mx-auto mb-1 text-amber-400" /><p className="font-black text-lg">{rep.helpful || 0}</p><p className="text-[10px] text-muted uppercase font-bold">Helpful</p></div>
                <div className="bg-background/50 rounded-2xl p-3 text-center border border-border-subtle/50"><Target className="w-4 h-4 mx-auto mb-1 text-blue-400" /><p className="font-black text-lg">{rep.simplest || 0}</p><p className="text-[10px] text-muted uppercase font-bold">Simple</p></div>
                <div className="bg-background/50 rounded-2xl p-3 text-center border border-border-subtle/50"><Activity className="w-4 h-4 mx-auto mb-1 text-pink-400" /><p className="font-black text-lg">{rep.creative || 0}</p><p className="text-[10px] text-muted uppercase font-bold">Creative</p></div>
              </div>
            </div>

            {/* Streaks Box (Span 4) */}
            <div className="md:col-span-4 bg-background-secondary/40 backdrop-blur-xl border border-border-subtle p-6 rounded-4xl hover:border-orange-500/30 transition-colors flex flex-col justify-between">
              <h3 className="text-sm font-extrabold text-muted uppercase tracking-wider flex items-center gap-2 mb-6"><Flame className="w-5 h-5 text-orange-500" /> Active Streaks</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                  <span className="font-bold text-orange-400">🔥 General coding</span>
                  <span className="text-2xl font-black text-orange-500">{streaks.currentGeneral || 0} <span className="text-sm">days</span></span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <span className="font-bold text-blue-400">🎯 POTD Solver</span>
                  <span className="text-2xl font-black text-blue-500">{streaks.currentPotd || 0} <span className="text-sm">days</span></span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="font-bold text-emerald-400">⚔️ Contests</span>
                  <span className="text-2xl font-black text-emerald-500">{streaks.currentContest || 0} <span className="text-sm">days</span></span>
                </div>
              </div>
            </div>

            {/* Challenge Box (Span 4) */}
            <div className="md:col-span-4 bg-background-secondary/40 backdrop-blur-xl border border-border-subtle p-6 rounded-4xl hover:border-pink-500/30 transition-colors flex flex-col">
              <h3 className="text-sm font-extrabold text-muted uppercase tracking-wider flex items-center gap-2 mb-6"><Target className="w-5 h-5 text-pink-500" /> Current Challenge</h3>
              {challenge.activeDays ? (
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-6xl font-black text-foreground">{challenge.progress}</span>
                    <span className="text-xl font-bold text-muted mb-1">/ {challenge.activeDays} Days</span>
                  </div>
                  <div className="w-full h-4 bg-background rounded-full overflow-hidden border border-border-subtle">
                    <div className="h-full bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-1000 relative" style={{ width: `${(challenge.progress / challenge.activeDays) * 100}%` }}>
                      <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-size-[20px_20px] animate-[slide_1s_linear_infinite]" />
                    </div>
                  </div>
                  <p className="text-center text-sm font-bold text-pink-400 mt-4 uppercase tracking-widest">{Math.round((challenge.progress / challenge.activeDays) * 100)}% Completed</p>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted/50 font-bold italic border-2 border-dashed border-border-subtle rounded-2xl">
                  No active challenge
                </div>
              )}
            </div>

          </div>

          {/* HEATMAP & SOLUTIONS */}
          <div className="mt-6 bg-background-secondary/40 backdrop-blur-xl border border-border-subtle p-8 rounded-4xl">
            <ActivityHeatmap data={heatmap} />
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
                    {/* Problem Info Wrapper */}
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

                    {/* The Actual Solution Card */}
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