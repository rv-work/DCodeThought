"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { getLeaderboardData, getFriendsLeaderboardData } from "@/api/leaderboard.api";
import { useAuth } from "@/hooks/useAuth";
import { Trophy, Flame, BrainCircuit, GraduationCap, Medal, Rocket, Target, Sparkles, Users } from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";
import type {
  LeaderboardTab,
  LeaderboardResponse,
  UserLeaderboardEntry,
  CollegeLeaderboardEntry,
  TimeFilter,
  StreakType
} from "@/types/leaderboard";

const isUserEntry = (entry: UserLeaderboardEntry | CollegeLeaderboardEntry): entry is UserLeaderboardEntry => {
  return (entry as UserLeaderboardEntry).username !== undefined;
};
const isCollegeEntry = (entry: UserLeaderboardEntry | CollegeLeaderboardEntry): entry is CollegeLeaderboardEntry => {
  return (entry as CollegeLeaderboardEntry).collegeName !== undefined;
};

function LeaderboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user: currentUser } = useAuth(); // Hook for logged-in user

  const urlTab = (searchParams.get("tab") as LeaderboardTab) || "streak";

  // State for Main Tab & Sub Filters
  const [activeTab, setActiveTab] = useState<LeaderboardTab>(urlTab);
  const [time, setTime] = useState<TimeFilter>("all_time");
  const [streakType, setStreakType] = useState<StreakType>("general");
  const [challengeDays, setChallengeDays] = useState<number>(100);

  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const [data, setData] = useState<(UserLeaderboardEntry | CollegeLeaderboardEntry)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync state with URL
  useEffect(() => {
    if (urlTab !== activeTab) setActiveTab(urlTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlTab]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [activeTab, time, streakType, challengeDays]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        if (page === 1) setLoading(true);
        else setIsLoadingMore(true);

        let res: LeaderboardResponse;

        // Logic for Friends Leaderboard vs Global
        if (activeTab === "friends") {
          if (!currentUser) {
            toast.error("Please login to view your friends leaderboard.");
            setLoading(false);
            setIsLoadingMore(false);
            return;
          }
          res = await getFriendsLeaderboardData();
        } else {
          res = await getLeaderboardData({
            tab: activeTab, time, streakType, challengeDays, page
          });
        }

        if (page === 1) {
          setData(res.data);
        } else {
          setData(prev => [...prev, ...res.data]);
        }
        setHasMore(res.hasMore);

      } catch (err) {
        toast.error(parseError(err));
      } finally {
        setLoading(false);
        setIsLoadingMore(false);
      }
    };
    fetchLeaderboard();
  }, [activeTab, time, streakType, challengeDays, page, currentUser]);

  const handleTabChange = (tab: LeaderboardTab) => {
    setActiveTab(tab);
    router.push(`/leaderboard?tab=${tab}`, { scroll: false });
  };

  // Safe renderer for score
  const getScore = (entry: UserLeaderboardEntry | CollegeLeaderboardEntry) => {
    if (isCollegeEntry(entry)) return `${entry.totalStreakScore} pts`;
    if (activeTab === "rising") return `${(entry as UserLeaderboardEntry).recentSolvedCount} Solved`;
    if (activeTab === "thinker") return `${(entry as UserLeaderboardEntry).periodScore || (entry as UserLeaderboardEntry).reputation?.totalThinkerScore || 0} Rep`;
    if (activeTab === "challenge" || activeTab === "newly_joined") return `${(entry as UserLeaderboardEntry).challenge?.progress || 0}/${(entry as UserLeaderboardEntry).challenge?.activeDays} Days`;
    if (activeTab === "streak" || activeTab === "friends") { // Friends tab ranks by general streak
      if (streakType === "potd" && activeTab !== "friends") return `${(entry as UserLeaderboardEntry).streaks?.maxPotd || 0} Days`;
      if (streakType === "contest" && activeTab !== "friends") return `${(entry as UserLeaderboardEntry).streaks?.maxContest || 0} Days`;
      return `${(entry as UserLeaderboardEntry).streaks?.maxGeneral || 0} Days`;
    }
    return "0";
  };

  const getName = (entry: UserLeaderboardEntry | CollegeLeaderboardEntry) => {
    if (isCollegeEntry(entry)) return entry.collegeName;
    return entry.name;
  };

  const getSubtitle = (entry: UserLeaderboardEntry | CollegeLeaderboardEntry) => {
    if (isCollegeEntry(entry)) return `${entry.studentCount} Students`;
    return `@${entry.username}`;
  };

  const podiumData = [data[1], data[0], data[2]];

  return (
    <div className="max-w-6xl mx-auto px-6 relative z-10 animate-fade-in-up pb-20">

      {/* MAIN TABS CONTROLS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 p-2 bg-background-secondary/60 backdrop-blur-xl border border-border-subtle rounded-3xl w-fit mx-auto shadow-2xl">
        <button onClick={() => handleTabChange("friends")} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === "friends" ? "bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]" : "text-muted hover:text-foreground hover:bg-background/50"}`}><Users className="w-4 h-4" /> Friends</button>
        <button onClick={() => handleTabChange("streak")} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === "streak" ? "bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]" : "text-muted hover:text-foreground hover:bg-background/50"}`}><Flame className="w-4 h-4" /> Streaks</button>
        <button onClick={() => handleTabChange("thinker")} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === "thinker" ? "bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]" : "text-muted hover:text-foreground hover:bg-background/50"}`}><BrainCircuit className="w-4 h-4" /> Thinkers</button>
        <button onClick={() => handleTabChange("rising")} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === "rising" ? "bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]" : "text-muted hover:text-foreground hover:bg-background/50"}`}><Rocket className="w-4 h-4" /> Rising</button>
        <button onClick={() => handleTabChange("challenge")} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === "challenge" || activeTab === "newly_joined" ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "text-muted hover:text-foreground hover:bg-background/50"}`}><Target className="w-4 h-4" /> Challenges</button>
        <button onClick={() => handleTabChange("college")} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === "college" ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "text-muted hover:text-foreground hover:bg-background/50"}`}><GraduationCap className="w-4 h-4" /> Colleges</button>
      </div>

      {/* SUB FILTERS */}
      <div className="flex justify-center mb-16 h-10">
        {activeTab === "streak" && (
          <div className="flex gap-2 animate-fade-in">
            {["general", "potd", "contest"].map((t) => (
              <button key={t} onClick={() => setStreakType(t as StreakType)} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${streakType === t ? "bg-orange-500/10 border-orange-500 text-orange-500" : "bg-transparent border-border-subtle text-muted hover:text-foreground"}`}>
                {t} Streak
              </button>
            ))}
          </div>
        )}
        {activeTab === "thinker" && (
          <div className="flex gap-2 animate-fade-in">
            {[{ v: "all_time", l: "All Time" }, { v: "this_month", l: "This Month" }, { v: "this_week", l: "This Week" }].map((t) => (
              <button key={t.v} onClick={() => setTime(t.v as TimeFilter)} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${time === t.v ? "bg-purple-500/10 border-purple-500 text-purple-500" : "bg-transparent border-border-subtle text-muted hover:text-foreground"}`}>
                {t.l}
              </button>
            ))}
          </div>
        )}
        {(activeTab === "challenge" || activeTab === "newly_joined") && (
          <div className="flex gap-2 animate-fade-in">
            <button onClick={() => handleTabChange("newly_joined")} className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${activeTab === "newly_joined" ? "bg-emerald-500/10 border-emerald-500 text-emerald-500" : "bg-transparent border-border-subtle text-muted hover:text-foreground"}`}>
              <Sparkles className="w-3 h-3" /> Newly Joined
            </button>
            {[30, 50, 100, 200, 365].map((d) => (
              <button key={d} onClick={() => { handleTabChange("challenge"); setChallengeDays(d); }} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${activeTab === "challenge" && challengeDays === d ? "bg-emerald-500/10 border-emerald-500 text-emerald-500" : "bg-transparent border-border-subtle text-muted hover:text-foreground"}`}>
                {d} Days
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4" />
          <p className="text-muted font-bold animate-pulse">Calculating Ranks...</p>
        </div>
      ) : data.length === 0 || (activeTab === "friends" && data.length <= 1) ? (
        <div className="text-center py-20 bg-background-secondary/30 rounded-4xl border border-border-subtle border-dashed">
          {activeTab === "friends" ? (
            <>
              <Users className="w-16 h-16 text-indigo-500/50 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold text-foreground mb-2">It&apos;s quiet here...</h3>
              <p className="text-muted mb-6">You haven&apos;t added any friends yet. Add friends to compete with them!</p>
              <Link href="/problems" className="px-6 py-2.5 rounded-xl bg-indigo-500 text-white font-bold hover:scale-[1.02] transition-all">
                Find Coders
              </Link>
            </>
          ) : (
            <>
              <Trophy className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold text-foreground mb-2">No data yet</h3>
              <p className="text-muted">The leaderboard is waiting for its first champion.</p>
            </>
          )}
        </div>
      ) : (
        <>
          {/* THE PODIUM (Top 3) */}
          <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6 mb-20 h-87.5">
            {podiumData.map((entry, idx) => {
              if (!entry) return <div key={idx} className="w-24 sm:w-32 md:w-48" />;

              const isFirst = idx === 1;
              const isSecond = idx === 0;
              const rank = isFirst ? 1 : isSecond ? 2 : 3;
              const heightClass = isFirst ? "h-64" : isSecond ? "h-48" : "h-36";
              const colorClass = isFirst ? "from-yellow-400 to-amber-600 shadow-yellow-500/40"
                : isSecond ? "from-gray-300 to-gray-500 shadow-gray-400/40"
                  : "from-amber-700 to-orange-800 shadow-orange-700/40";
              const badgeColor = isFirst ? "text-yellow-500" : isSecond ? "text-gray-400" : "text-amber-700";

              return (
                <div key={idx} className="flex flex-col items-center group w-28 sm:w-36 md:w-52 relative">
                  <div className={`flex flex-col items-center text-center absolute ${isFirst ? "-top-36" : "-top-28"} transition-transform duration-300 group-hover:-translate-y-2 w-full`}>
                    <div className="relative mb-3">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-linear-to-br ${colorClass} p-1 shadow-xl flex items-center justify-center text-2xl font-black text-white`}>
                        <div className="w-full h-full bg-background/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          {getName(entry).charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className={`absolute -bottom-3 -right-2 w-8 h-8 rounded-full bg-background border-2 border-background flex items-center justify-center shadow-lg ${badgeColor}`}>
                        <Medal className="w-5 h-5 fill-current" />
                      </div>
                    </div>
                    <h3 className="font-extrabold text-foreground truncate w-full px-2 text-sm sm:text-base">{getName(entry)}</h3>
                    <p className="text-xs font-semibold text-muted truncate w-full px-2">{getSubtitle(entry)}</p>
                  </div>

                  <div className={`w-full ${heightClass} rounded-t-3xl bg-linear-to-t ${colorClass} p-px relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0)] transition-all duration-500 group-hover:shadow-[0_0_40px_var(--tw-shadow-color)]`}>
                    <div className="w-full h-full rounded-t-[1.4rem] bg-background/80 backdrop-blur-xl flex flex-col items-center justify-start pt-6">
                      <span className={`text-4xl font-black opacity-20 ${badgeColor}`}>#{rank}</span>
                      <span className={`text-lg font-bold mt-2 ${badgeColor} drop-shadow-md`}>{getScore(entry)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* THE LIST (Rank 4+) */}
          {data.length > 3 && (
            <div className="bg-background-secondary/40 backdrop-blur-xl border border-border-subtle rounded-4xl overflow-hidden shadow-xl mb-10">
              <div className="px-8 py-5 border-b border-border-subtle bg-background-tertiary/50 flex text-xs font-bold text-muted uppercase tracking-wider">
                <div className="w-16 text-center">Rank</div>
                <div className="flex-1">Participant</div>
                <div className="w-32 text-right">Score</div>
              </div>
              <div className="divide-y divide-border-subtle/50">
                {data.slice(3).map((entry, idx) => (
                  <div key={idx} className="flex items-center px-8 py-5 hover:bg-white/5 transition-colors duration-200">
                    <div className="w-16 text-center font-extrabold text-muted">#{idx + 4}</div>
                    <div className="flex-1 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold border border-purple-500/20">
                        {getName(entry).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-base flex items-center gap-2">
                          {getName(entry)}
                          {isUserEntry(entry) && entry.badges?.includes("Top_Thinker") && (
                            <Medal className="w-3.5 h-3.5 text-amber-500" />
                          )}
                        </div>
                        <div className="text-xs font-medium text-muted">{getSubtitle(entry)}</div>
                      </div>
                    </div>
                    <div className="w-32 text-right font-black text-foreground">
                      {getScore(entry)}
                    </div>
                  </div>
                ))}
              </div>

              {/* LOAD MORE BUTTON */}
              {hasMore && (
                <div className="p-6 text-center border-t border-border-subtle bg-background-tertiary/20">
                  <button
                    onClick={() => setPage(prev => prev + 1)}
                    disabled={isLoadingMore}
                    className="px-8 py-3 rounded-xl bg-background border border-border-subtle text-foreground font-bold hover:bg-white/5 transition-all disabled:opacity-50"
                  >
                    {isLoadingMore ? "Loading Ranks..." : "Load More Rankings"}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-12 relative overflow-hidden">
        <div className="absolute top-[-10%] left-1/4 w-150 h-150 bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-125 h-125 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="text-center space-y-4 animate-fade-in-up mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4" /> Global Rankings
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            The <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-purple-500">Hall of Fame</span>
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Compete globally or dominate with your college. Consistency is key.
          </p>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        }>
          <LeaderboardContent />
        </Suspense>
      </div>
    </>
  );
}