"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { getCompareData } from "@/api/profile.api";
import { parseError } from "@/utils/parseError";
import toast from "react-hot-toast";
import {
  Swords, X, Flame, BrainCircuit, Target,
  Zap, ShieldAlert, Crosshair, Users, Star, Calendar, Quote, Shield, MapPin
} from "lucide-react";
import type { CompareUser } from "@/types/profile";
import Link from "next/link";
import { useUISounds } from "@/hooks/useUISounds";

const PLAYER_THEMES = [
  {
    name: "PLAYER 1",
    gradient: "from-rose-500 to-pink-600",
    border: "border-pink-500/50",
    shadow: "shadow-[0_0_50px_rgba(236,72,153,0.3)]",
    text: "text-pink-400",
    barBg: "bg-pink-500",
    bgHover: "hover:shadow-[0_0_80px_rgba(236,72,153,0.5)]"
  },
  {
    name: "PLAYER 2",
    gradient: "from-cyan-400 to-blue-600",
    border: "border-blue-500/50",
    shadow: "shadow-[0_0_50px_rgba(59,130,246,0.3)]",
    text: "text-blue-400",
    barBg: "bg-blue-500",
    bgHover: "hover:shadow-[0_0_80px_rgba(59,130,246,0.5)]"
  },
  {
    name: "PLAYER 3",
    gradient: "from-lime-400 to-emerald-600",
    border: "border-emerald-500/50",
    shadow: "shadow-[0_0_50px_rgba(16,185,129,0.3)]",
    text: "text-emerald-400",
    barBg: "bg-emerald-500",
    bgHover: "hover:shadow-[0_0_80px_rgba(16,185,129,0.5)]"
  }
];

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { playPop, playLevelUp } = useUISounds();

  const urlUsers = searchParams.get("u");
  const initialUsernames = urlUsers ? urlUsers.split(",").filter(Boolean) : [];

  const [usernames, setUsernames] = useState<string[]>(initialUsernames);
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<CompareUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCompare = async () => {
      if (usernames.length === 0) {
        setData([]);
        return;
      }
      try {
        setLoading(true);
        const res = await getCompareData(usernames);
        const sortedData = usernames.map(name =>
          res.users.find(u => u.username?.toLowerCase() === name.toLowerCase())
        ).filter((u): u is CompareUser => u !== undefined);

        setData(sortedData);
        if (sortedData.length > 1) playLevelUp();
      } catch (err) {
        toast.error(parseError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchCompare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlUsers]);

  const handleAddUser = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = inputValue.trim().toLowerCase();
    if (!cleanInput) return;
    if (usernames.includes(cleanInput)) return toast.error("Fighter already in arena!");
    if (usernames.length >= 3) return toast.error("Max 3 fighters in this battle.");

    playPop();
    const newUsers = [...usernames, cleanInput];
    setUsernames(newUsers);
    setInputValue("");
    router.push(`/compare?u=${newUsers.join(",")}`, { scroll: false });
  };

  const handleRemoveUser = (usernameToRemove: string) => {
    playPop();
    const newUsers = usernames.filter(u => u !== usernameToRemove);
    setUsernames(newUsers);
    router.push(newUsers.length > 0 ? `/compare?u=${newUsers.join(",")}` : `/compare`, { scroll: false });
  };

  // 🏆 ADVANCED MAX VALUES FOR ALL METRICS 🏆
  const m_thinker = Math.max(...data.map(u => u.reputation?.totalThinkerScore || 0), -1);
  const m_helpful = Math.max(...data.map(u => u.reputation?.helpful || 0), -1);
  const m_simplest = Math.max(...data.map(u => u.reputation?.simplest || 0), -1);
  const m_creative = Math.max(...data.map(u => u.reputation?.creative || 0), -1);

  const m_solved = Math.max(...data.map(u => u.problemsSolved || 0), -1);
  const m_friends = Math.max(...data.map(u => u.friendsCount || 0), -1);
  const m_badges = Math.max(...data.map(u => u.badges?.length || 0), -1);

  const m_maxGen = Math.max(...data.map(u => u.streaks?.maxGeneral || 0), -1);
  const m_curGen = Math.max(...data.map(u => u.streaks?.currentGeneral || 0), -1);
  const m_maxPotd = Math.max(...data.map(u => u.streaks?.maxPotd || 0), -1);
  const m_curPotd = Math.max(...data.map(u => u.streaks?.currentPotd || 0), -1);
  const m_maxCont = Math.max(...data.map(u => u.streaks?.maxContest || 0), -1);
  const m_curCont = Math.max(...data.map(u => u.streaks?.currentContest || 0), -1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pb-20">

      {/* DRAFTING CONSOLE */}
      <div className="bg-background/80 backdrop-blur-2xl border-2 border-border-subtle rounded-3xl p-4 shadow-2xl mb-16 flex flex-col md:flex-row items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50 animate-[pulse_2s_ease-in-out_infinite]" />

        <div className="flex-1 w-full flex flex-wrap items-center justify-center md:justify-start gap-3 pl-0 md:pl-4">
          {usernames.length === 0 && <span className="text-muted font-black uppercase tracking-widest text-xs sm:text-sm animate-pulse flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Awaiting Fighters...</span>}
          {usernames.map((u, i) => (
            <div key={u} className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border-2 font-black uppercase tracking-wider text-xs sm:text-sm bg-background ${PLAYER_THEMES[i].border} ${PLAYER_THEMES[i].text} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
              @{u}
              <button onClick={() => handleRemoveUser(u)} className="hover:text-white rounded-full p-0.5 transition-colors"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddUser} className="w-full md:w-100 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none"><Crosshair className="w-5 h-5 text-purple-500 animate-spin-slow" /></div>
          <input type="text" placeholder="LOCK IN USERNAME..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} disabled={usernames.length >= 3} className="w-full bg-black/50 border-2 border-border-subtle rounded-2xl pl-12 pr-28 py-4 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all font-black uppercase tracking-widest text-white disabled:opacity-50 text-sm" />
          <button type="submit" disabled={!inputValue.trim() || usernames.length >= 3} className="absolute inset-y-2 right-2 px-4 sm:px-6 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 text-white font-black uppercase tracking-widest hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-lg text-sm">
            Draft
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 border-8 border-background border-t-purple-500 border-b-blue-500 rounded-full animate-spin" />
            <Swords className="w-12 h-12 text-foreground absolute animate-pulse" />
          </div>
          <h2 className="text-3xl font-black mt-8 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500 uppercase tracking-widest animate-pulse">Scanning Stats...</h2>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <Swords className="w-40 h-40 text-border-subtle mx-auto mb-8 drop-shadow-2xl" />
          <h3 className="text-4xl sm:text-6xl font-black text-foreground mb-4 uppercase tracking-tighter drop-shadow-lg">Select Fighter</h3>
          <p className="text-muted sm:text-xl font-bold tracking-widest uppercase text-sm">The Arena demands a battle.</p>
        </div>
      ) : (
        <div className={`flex flex-col xl:flex-row items-start justify-center gap-8`}>
          {data.map((user, index) => {
            const theme = PLAYER_THEMES[index];

            // Safe Extractions
            const u_thinker = user.reputation?.totalThinkerScore || 0;
            const u_helpful = user.reputation?.helpful || 0;
            const u_simplest = user.reputation?.simplest || 0;
            const u_creative = user.reputation?.creative || 0;

            const u_solved = user.problemsSolved || 0;
            const u_friends = user.friendsCount || 0;
            const u_badges = user.badges?.length || 0;

            const u_curGen = user.streaks?.currentGeneral || 0;
            const u_maxGen = user.streaks?.maxGeneral || 0;
            const u_curPotd = user.streaks?.currentPotd || 0;
            const u_maxPotd = user.streaks?.maxPotd || 0;
            const u_curCont = user.streaks?.currentContest || 0;
            const u_maxCont = user.streaks?.maxContest || 0;

            const c_active = user.challenge?.activeDays || 0;
            const c_prog = user.challenge?.progress || 0;

            // Small helper to render win icon
            const WinIcon = ({ isWin }: { isWin: boolean }) => isWin ? <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 animate-pulse shrink-0" /> : null;

            return (
              <div key={user._id} className="w-full flex-1 max-w-xl mx-auto relative group">

                {index > 0 && (
                  <div className="hidden xl:flex absolute -left-4 top-1/2 -translate-y-1/2 z-50 items-center justify-center w-12 h-12 rounded-full bg-background border-4 border-border-subtle shadow-2xl scale-125">
                    <span className="text-xl font-black italic text-transparent bg-clip-text bg-linear-to-br from-yellow-400 to-red-600">VS</span>
                  </div>
                )}

                <div className={`w-full bg-background-secondary/80 backdrop-blur-xl border-2 ${theme.border} rounded-3xl overflow-hidden transition-all duration-500 shadow-xl ${theme.bgHover} flex flex-col h-full`}>

                  {/* --- HEADER & BIO SECTION --- */}
                  <div className={`p-6 text-center relative border-b-2 border-border-subtle/50`}>
                    <div className={`absolute top-0 left-0 w-full h-full bg-linear-to-b ${theme.gradient} opacity-5 blur-3xl`} />
                    <span className={`absolute top-4 left-4 text-[10px] font-black ${theme.text} uppercase tracking-widest border border-current px-2 py-1 rounded-md`}>
                      {theme.name}
                    </span>
                    <Link href={`/u/${user.username}`}>
                      <div className={`w-28 h-28 mx-auto rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-5xl font-black text-white shadow-2xl mb-4 border-4 border-background relative z-10 hover:scale-105 transition-transform`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    </Link>
                    <h3 className="text-2xl font-black text-foreground tracking-tight relative z-10 truncate px-2">{user.name}</h3>
                    <p className={`${theme.text} font-bold text-sm tracking-widest uppercase relative z-10 truncate`}>@{user.username}</p>

                    <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-muted uppercase">
                      {user.college ? <span className="flex items-center gap-1 bg-background px-2 py-1 rounded-md border border-border-subtle"><MapPin className="w-3 h-3" /> {user.college}</span> : <span className="text-muted/50 italic">No Clan</span>}
                      <span className="flex items-center gap-1 bg-background px-2 py-1 rounded-md border border-border-subtle"><Calendar className="w-3 h-3" /> {new Date(user.dateOfJoining).getFullYear()}</span>
                    </div>

                    <div className="mt-4 px-4 pb-2">
                      {user.bio ? (
                        <p className="text-sm text-muted italic flex items-start justify-center gap-1 line-clamp-2"><Quote className="w-3 h-3 shrink-0 opacity-50 mt-0.5" /> &quot;{user.bio}&quot;</p>
                      ) : (
                        <p className="text-sm text-muted/50 italic">No bio provided.</p>
                      )}
                    </div>
                  </div>

                  {/* --- ALL STATS LIST --- */}
                  <div className="p-6 flex-1 bg-background/30 flex flex-col gap-6">

                    {/* Core Numbers */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className={`bg-background p-3 rounded-2xl border ${u_solved === m_solved && m_solved > 0 ? "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]" : "border-border-subtle"} text-center flex flex-col items-center justify-center`}>
                        <Target className="w-4 h-4 text-blue-500 mb-1" />
                        <span className="text-xl font-black text-foreground flex items-center gap-1">{u_solved} <WinIcon isWin={u_solved === m_solved && m_solved > 0} /></span>
                        <span className="text-[9px] font-bold text-muted uppercase tracking-wider mt-1">Solved</span>
                      </div>
                      <div className={`bg-background p-3 rounded-2xl border ${u_thinker === m_thinker && m_thinker > 0 ? "border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "border-border-subtle"} text-center flex flex-col items-center justify-center`}>
                        <BrainCircuit className="w-4 h-4 text-purple-500 mb-1" />
                        <span className="text-xl font-black text-foreground flex items-center gap-1">{u_thinker} <WinIcon isWin={u_thinker === m_thinker && m_thinker > 0} /></span>
                        <span className="text-[9px] font-bold text-muted uppercase tracking-wider mt-1">Reputation</span>
                      </div>
                      <div className={`bg-background p-3 rounded-2xl border ${u_friends === m_friends && m_friends > 0 ? "border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.2)]" : "border-border-subtle"} text-center flex flex-col items-center justify-center`}>
                        <Users className="w-4 h-4 text-pink-500 mb-1" />
                        <span className="text-xl font-black text-foreground flex items-center gap-1">{u_friends} <WinIcon isWin={u_friends === m_friends && m_friends > 0} /></span>
                        <span className="text-[9px] font-bold text-muted uppercase tracking-wider mt-1">Friends</span>
                      </div>
                    </div>

                    {/* Reputation Breakdown */}
                    <div className="bg-background rounded-2xl border border-border-subtle p-4">
                      <h4 className="text-xs font-black text-muted uppercase tracking-widest mb-3 flex items-center gap-2"><Star className="w-3.5 h-3.5" /> Community Tags</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-amber-500 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Helpful</span>
                          <span className="font-black flex items-center gap-1">{u_helpful} <WinIcon isWin={u_helpful === m_helpful && m_helpful > 0} /></span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-emerald-500 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Simplest</span>
                          <span className="font-black flex items-center gap-1">{u_simplest} <WinIcon isWin={u_simplest === m_simplest && m_simplest > 0} /></span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-indigo-500 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Creative</span>
                          <span className="font-black flex items-center gap-1">{u_creative} <WinIcon isWin={u_creative === m_creative && m_creative > 0} /></span>
                        </div>
                      </div>
                    </div>

                    {/* All Streaks Breakdown */}
                    <div className="bg-background rounded-2xl border border-border-subtle p-4">
                      <h4 className="text-xs font-black text-muted uppercase tracking-widest mb-3 flex items-center gap-2"><Flame className="w-3.5 h-3.5" /> Consistency (Cur / Max)</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm bg-background-secondary/50 p-2 rounded-lg">
                          <span className="font-bold text-orange-400">General</span>
                          <div className="flex items-center gap-3 font-black">
                            <span className="flex items-center gap-1 text-orange-300">{u_curGen} <WinIcon isWin={u_curGen === m_curGen && m_curGen > 0} /></span>
                            <span className="text-muted font-normal">/</span>
                            <span className="flex items-center gap-1 text-orange-500">{u_maxGen} <WinIcon isWin={u_maxGen === m_maxGen && m_maxGen > 0} /></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm bg-background-secondary/50 p-2 rounded-lg">
                          <span className="font-bold text-blue-400">POTD</span>
                          <div className="flex items-center gap-3 font-black">
                            <span className="flex items-center gap-1 text-blue-300">{u_curPotd} <WinIcon isWin={u_curPotd === m_curPotd && m_curPotd > 0} /></span>
                            <span className="text-muted font-normal">/</span>
                            <span className="flex items-center gap-1 text-blue-500">{u_maxPotd} <WinIcon isWin={u_maxPotd === m_maxPotd && m_maxPotd > 0} /></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm bg-background-secondary/50 p-2 rounded-lg">
                          <span className="font-bold text-emerald-400">Contest</span>
                          <div className="flex items-center gap-3 font-black">
                            <span className="flex items-center gap-1 text-emerald-300">{u_curCont} <WinIcon isWin={u_curCont === m_curCont && m_curCont > 0} /></span>
                            <span className="text-muted font-normal">/</span>
                            <span className="flex items-center gap-1 text-emerald-500">{u_maxCont} <WinIcon isWin={u_maxCont === m_maxCont && m_maxCont > 0} /></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Challenge & Badges */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <div className="bg-background rounded-2xl border border-border-subtle p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Challenge</span>
                        {c_active > 0 ? (
                          <>
                            <span className="text-2xl font-black text-foreground">{c_prog} <span className="text-xs text-muted">/ {c_active}</span></span>
                            <span className="text-[9px] font-bold text-emerald-500 uppercase mt-1">Active</span>
                          </>
                        ) : (
                          <span className="text-xs font-bold text-muted/50 italic mt-1">No Active</span>
                        )}
                      </div>

                      <div className={`bg-background rounded-2xl border ${u_badges === m_badges && m_badges > 0 ? "border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "border-border-subtle"} p-4 flex flex-col items-center justify-center text-center`}>
                        <span className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Badges</span>
                        <span className="text-2xl font-black text-foreground flex items-center gap-1">{u_badges} <WinIcon isWin={u_badges === m_badges && m_badges > 0} /></span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-12 relative overflow-x-hidden">
        <div className="absolute top-[10%] left-[-10%] w-150 h-150 bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-150 h-150 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[20%] w-200 h-100 bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="text-center space-y-4 animate-fade-in-up mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <Swords className="w-4 h-4 animate-pulse" /> Versus Arena
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase italic drop-shadow-xl leading-tight">
            Clash of <span className="text-transparent bg-clip-text bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center pr-4 pb-2">Coders</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto font-bold uppercase tracking-widest mt-2">
            Draft fighters. Compare EVERY detail. Establish Dominance.
          </p>
        </div>

        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>}>
          <CompareContent />
        </Suspense>
      </div>


    </>
  );
}