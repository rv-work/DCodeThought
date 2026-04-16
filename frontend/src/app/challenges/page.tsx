"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { joinUserChallenge } from "@/api/profile.api";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";
import { Shield, Swords, Flame, Crown, Zap, CheckCircle2, Target, ShieldAlert, ArrowUpCircle, Activity, PenTool, X } from "lucide-react";
import { useUISounds } from "@/hooks/useUISounds";
import { User } from "@/types/user";

const CHALLENGES = [
  {
    days: 30,
    title: "Novice Run",
    desc: "Build the habit. Code daily for a month.",
    icon: Shield,
    color: "emerald",
    bg: "from-emerald-500/20 to-teal-500/5",
    border: "border-emerald-500/30 hover:border-emerald-500",
    text: "text-emerald-400",
    shadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
  },
  {
    days: 50,
    title: "Code Warrior",
    desc: "Push your limits. Halfway to a hundred.",
    icon: Swords,
    color: "blue",
    bg: "from-blue-500/20 to-cyan-500/5",
    border: "border-blue-500/30 hover:border-blue-500",
    text: "text-blue-400",
    shadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
  },
  {
    days: 100,
    title: "Centurion",
    desc: "A true test of consistency. 100 days straight.",
    icon: Flame,
    color: "orange",
    bg: "from-orange-500/20 to-red-500/5",
    border: "border-orange-500/30 hover:border-orange-500",
    text: "text-orange-400",
    shadow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
  },
  {
    days: 200,
    title: "Grandmaster",
    desc: "Only the elite survive this long.",
    icon: Zap,
    color: "purple",
    bg: "from-purple-500/20 to-pink-500/5",
    border: "border-purple-500/30 hover:border-purple-500",
    text: "text-purple-400",
    shadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
  },
  {
    days: 365,
    title: "Immortal Entity",
    desc: "A full year of relentless coding. God tier.",
    icon: Crown,
    color: "rose",
    bg: "from-rose-500/20 to-red-600/5",
    border: "border-rose-500/50 hover:border-rose-400",
    text: "text-rose-400",
    shadow: "hover:shadow-[0_0_50px_rgba(225,29,72,0.5)]"
  }
];

export default function ChallengesPage() {
  const { user } = useAuth();
  const { playLevelUp } = useUISounds();
  const [loadingId, setLoadingId] = useState<number | string | null>(null);

  // Custom Challenge Modal States
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [customDays, setCustomDays] = useState<number>(14);
  const [customTitle, setCustomTitle] = useState<string>("");
  const [customDesc, setCustomDesc] = useState<string>("");

  const activeDays = user?.challenge?.activeDays || 0;
  const progress = user?.challenge?.progress || 0;
  const progressPercentage = activeDays > 0 ? Math.round((progress / activeDays) * 100) : 0;

  // Retrieve user's custom title/desc if they have one active
  const activeTitle = (user as User)?.challenge?.title || CHALLENGES.find(c => c.days === activeDays)?.title || `${activeDays} Day Challenge`;

  const handleJoin = async (days: number, title?: string, desc?: string) => {
    if (!user) {
      toast.error("Please login to accept a quest!");
      return;
    }
    if (activeDays === days && !title) {
      toast("You are already on this quest!", { icon: "⚔️" });
      return;
    }

    // GAMIFIED CUSTOM TOAST CONFIRMATION
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
          <span className="font-bold text-sm text-foreground">
            {activeDays > 0
              ? `You are replacing your active quest. Progress will reset.`
              : `Commit to ${days} days of non-stop coding?`
            }
          </span>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-bold rounded-lg border border-border-subtle text-muted hover:bg-white/5 transition-colors"
          >
            Retreat
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              setLoadingId(title ? "custom" : days);
              try {
                const res = await joinUserChallenge(days, title, desc);
                toast.success(res.message);
                playLevelUp();
                setIsCustomModalOpen(false);
                setTimeout(() => {
                  window.location.reload(); // Reload to update user context immediately
                }, 1500);
              } catch (error: unknown) {
                toast.error(parseError(error));
              } finally {
                setLoadingId(null);
              }
            }}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
          >
            Accept Fate
          </button>
        </div>
      </div>
    ), { duration: 8000, style: { maxWidth: '400px' } });
  };

  const handleCustomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (customDays < 7 || customDays > 365) {
      toast.error("Custom quest must be between 7 and 365 days.");
      return;
    }
    if (!customTitle.trim()) {
      toast.error("Give your quest a legendary name.");
      return;
    }
    handleJoin(customDays, customTitle, customDesc);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-12 relative overflow-x-hidden pb-20">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-linear-to-b from-emerald-500/10 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 animate-fade-in-up">

          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Target className="w-4 h-4 animate-pulse" /> The Quest Board
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase italic drop-shadow-xl leading-tight">
              Choose Your <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-500 pr-4 pb-2">Destiny</span>
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto font-bold uppercase tracking-widest mt-2">
              Commit to a streak. Solve problems daily. Earn exclusive badges and dominate the global leaderboards.
            </p>
          </div>

          {/* LIVE QUEST TRACKER */}
          {activeDays > 0 && (
            <div className="bg-background-secondary/80 backdrop-blur-2xl border-2 border-emerald-500/40 rounded-[2.5rem] p-8 md:p-12 mb-16 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-size-[20px_20px] opacity-50 pointer-events-none" />

              <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full border-4 border-emerald-500/30 flex items-center justify-center bg-emerald-500/10 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <Activity className="w-12 h-12 md:w-16 md:h-16 animate-pulse" />
              </div>

              <div className="relative z-10 flex-1 w-full text-center md:text-left">
                <h3 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Active Quest
                </h3>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
                  <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                    {activeTitle}
                  </h2>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-500">
                    {progress} <span className="text-lg text-muted font-bold">/ {activeDays} Days</span>
                  </div>
                </div>

                <div className="w-full h-6 bg-black/50 rounded-full overflow-hidden border border-emerald-500/30 p-1 box-content shadow-inner">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-emerald-500 to-cyan-400 transition-all duration-1000 relative shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                    style={{ width: `${Math.max(progressPercentage, 2)}%` }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_25%,rgba(255,255,255,0.3)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.3)_75%,rgba(255,255,255,0.3)_100%)] bg-size-[15px_15px] animate-[slide_1s_linear_infinite]" />
                  </div>
                </div>
                <p className="text-right text-xs font-bold text-emerald-500 mt-2 uppercase tracking-widest">{progressPercentage}% Completed</p>
              </div>
            </div>
          )}

          {/* Rules Section */}
          <div className="bg-background-secondary/40 backdrop-blur-xl border border-border-subtle rounded-4xl p-8 md:p-10 mb-16 shadow-xl max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-10 border-b border-border-subtle/50 pb-6">
              <ShieldAlert className="w-8 h-8 text-amber-500" />
              <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-widest">Rules of Engagement</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div className="flex gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-inner">
                  <Target className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-foreground mb-1.5 uppercase tracking-wider">The Exclusive Contract</h4>
                  <p className="text-sm text-muted font-medium leading-relaxed">You can only pledge to <strong>one active quest at a time</strong>. Accepting a new challenge will permanently reset your progress on the current one. Choose your duration wisely.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20 shadow-inner">
                  <Flame className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-foreground mb-1.5 uppercase tracking-wider">The Daily Grind</h4>
                  <p className="text-sm text-muted font-medium leading-relaxed">To advance your quest, you must solve at least <strong>1 problem every single day</strong>. This includes POTD, Contest submissions, or any General Practice problem on the platform.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 shadow-inner">
                  <ArrowUpCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-foreground mb-1.5 uppercase tracking-wider">Badge Evolution</h4>
                  <p className="text-sm text-muted font-medium leading-relaxed">Badges are dynamic. Complete 30 days to earn the Novice badge. If you continue and pass standard thresholds (50, 100), your smaller badge is <strong>automatically upgraded</strong>.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-inner">
                  <Crown className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-foreground mb-1.5 uppercase tracking-wider">Hall of Fame Glory</h4>
                  <p className="text-sm text-muted font-medium leading-relaxed">Your active challenge determines your bracket on the <strong>Global Leaderboard</strong>. You will be ranked against other warriors attempting the exact same milestone. May the best coder win.</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHALLENGES.map((challenge) => {
              const Icon = challenge.icon;
              const isActive = activeDays === challenge.days && !(user as User)?.challenge?.title; // Standard challenge check

              return (
                <div
                  key={challenge.days}
                  className={`relative overflow-hidden rounded-4xl border-2 bg-background-secondary/80 backdrop-blur-xl transition-all duration-500 transform-gpu hover:-translate-y-2 ${challenge.border} ${challenge.shadow} flex flex-col`}
                >
                  <div className={`absolute inset-0 bg-linear-to-b ${challenge.bg} opacity-50`} />

                  {isActive && (
                    <div className="absolute top-4 right-4 bg-emerald-500 text-background text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse z-20">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </div>
                  )}

                  <div className="p-8 relative z-10 flex flex-col flex-1">
                    <div className={`w-16 h-16 rounded-2xl bg-background border-2 border-border-subtle flex items-center justify-center mb-6 shadow-xl ${challenge.text}`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    <h2 className="text-3xl font-black text-foreground uppercase tracking-tight mb-2">{challenge.title}</h2>
                    <div className={`text-xl font-extrabold ${challenge.text} mb-4 flex items-baseline gap-1`}>
                      {challenge.days} <span className="text-sm text-muted font-bold tracking-widest uppercase">Days</span>
                    </div>

                    <p className="text-muted font-medium mb-8 flex-1">{challenge.desc}</p>

                    <button
                      onClick={() => handleJoin(challenge.days)}
                      disabled={loadingId === challenge.days || isActive}
                      className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg ${isActive
                        ? "bg-background border-2 border-emerald-500/50 text-emerald-500 cursor-default"
                        : `bg-foreground text-background hover:scale-105 hover:bg-${challenge.color}-500 hover:text-white`
                        } disabled:opacity-50 disabled:hover:scale-100`}
                    >
                      {loadingId === challenge.days ? "Forging Contract..." : isActive ? "Quest Active" : "Accept Quest"}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Custom Quest Card */}
            <div
              className={`relative overflow-hidden rounded-4xl border-2 bg-background-secondary/80 backdrop-blur-xl transition-all duration-500 transform-gpu hover:-translate-y-2 border-indigo-500/30 hover:border-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] flex flex-col cursor-pointer`}
              onClick={() => setIsCustomModalOpen(true)}
            >
              <div className="absolute inset-0 bg-linear-to-b from-indigo-500/20 to-cyan-500/5 opacity-50" />

              <div className="p-8 relative z-10 flex flex-col flex-1 items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-indigo-500/50 flex items-center justify-center mb-6 text-indigo-400 group-hover:border-indigo-400 group-hover:text-indigo-300 transition-colors">
                  <PenTool className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-foreground uppercase tracking-tight mb-2">Forge Your Own</h2>
                <p className="text-muted font-medium mb-8">Design a custom challenge. Pick your target days, name your quest, and set your own terms.</p>
                <div className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500 hover:text-white">
                  Create Custom Quest
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Custom Quest Modal Overlay */}
      {isCustomModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) setIsCustomModalOpen(false);
          }}
        >
          <div className="bg-background border-2 border-indigo-500/30 rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.2)] w-full max-w-lg overflow-hidden animate-fade-in-up">

            {/* Header */}
            <div className="p-6 border-b border-border-subtle flex items-center justify-between bg-indigo-500/5">
              <h3 className="text-xl font-black text-foreground flex items-center gap-2 uppercase tracking-widest">
                <PenTool className="w-5 h-5 text-indigo-500" /> Forge Custom Quest
              </h3>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="p-2 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCustomSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">Quest Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g., 75-Hard Data Structures"
                  value={customTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomTitle(e.target.value)}
                  className="w-full bg-background-secondary border border-border-subtle rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors font-bold"
                  maxLength={30}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">Description</label>
                <textarea
                  placeholder="What is your objective for this quest?"
                  value={customDesc}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-background-secondary border border-border-subtle rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  maxLength={100}
                />
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-xs font-bold text-muted uppercase tracking-widest">Target Days <span className="text-red-500">*</span></label>
                  <span className="text-xl font-black text-indigo-500">{customDays} Days</span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="365"
                  value={customDays}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomDays(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-bold text-muted mt-2">
                  <span>7 Days</span>
                  <span>180 Days</span>
                  <span>365 Days</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loadingId === "custom"}
                  className="w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg bg-indigo-500 text-white hover:scale-[1.02] hover:bg-indigo-400 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loadingId === "custom" ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Forging...</>
                  ) : "Begin Quest"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global CSS for the diagonal sliding animation in the bars */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slide {
          from { background-position: 0 0; }
          to { background-position: 30px 0; }
        }
      `}} />
    </>
  );
}