"use client";

import Link from "next/link";
import Avatar from "./ui/Avatar";
import { Zap, Award, ChevronRight, BookOpen, TrendingUp, Shield } from "lucide-react";
import { sidebarCardCls } from "./constants";
import { User } from "@/types/auth";

export default function LeftSidebar({ user }: { user: User | null }) {
  return (
    <aside className="hidden lg:flex flex-col gap-4 h-full overflow-y-auto scrollbar-hide pt-6 pb-6">
      {user ? (
        <div className={`${sidebarCardCls} overflow-y-auto max-h-100 custom-scrollbar relative`} >
          <div className="absolute top-0 left-0 right-0 h-16 bg-linear-to-br from-violet-500/20 to-blue-500/20 rounded-t-3xl" />
          <div className="relative pt-8 pb-1 flex flex-col items-center">
            <div className="-mt-8 mb-3">
              <Avatar name={user.name} size="lg" />
            </div>
            <div className="text-center mb-4">
              <h3 className="text-[15px] font-black text-foreground">{user.name}</h3>
              <p className="text-xs text-muted font-medium mt-0.5">@{user.username}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4 w-full">
              <div className="bg-background border border-border-subtle rounded-2xl p-3 text-center">
                <Zap className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <div className="text-lg font-black text-foreground">{user.streaks?.currentGeneral || 0}</div>
                <div className="text-[10px] text-muted uppercase font-bold tracking-widest">Streak</div>
              </div>
              <div className="bg-background border border-border-subtle rounded-2xl p-3 text-center">
                <Award className="w-4 h-4 text-violet-500 mx-auto mb-1" />
                <div className="text-lg font-black text-foreground">{user.reputation?.totalThinkerScore || 0}</div>
                <div className="text-[10px] text-muted uppercase font-bold tracking-widest">Rep</div>
              </div>
            </div>
            <Link
              href="/profile"
              className="flex items-center justify-center gap-1.5 w-full py-2 bg-background border border-border-subtle rounded-xl text-xs font-bold text-muted hover:text-foreground hover:bg-foreground/5 transition-all"
            >
              View Profile <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      ) : (
        <div className={`${sidebarCardCls} text-center`}>
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-500 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-[15px] font-black text-foreground mb-1.5">Join the Dojo</h3>
          <p className="text-xs text-muted mb-5 leading-relaxed">Share solutions, earn badges, and track your coding streak.</p>
          <Link
            href="/signup"
            className="block w-full py-2.5 bg-foreground text-background rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg"
          >
            Sign Up Free
          </Link>
        </div>
      )}

      <div className={`${sidebarCardCls} overflow-y-auto max-h-100 custom-scrollbar relative`} >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[11px] font-black text-muted uppercase tracking-widest">Trending</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["React", "Next.js", "Graphs", "DP", "MERN Stack", "System Design", "TypeScript"].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-background border border-border-subtle rounded-lg text-[11px] font-bold text-muted hover:text-foreground hover:border-violet-500/40 hover:bg-violet-500/10 cursor-pointer transition-all"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className={`${sidebarCardCls} overflow-y-auto max-h-100 custom-scrollbar relative`} >
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-3.5 h-3.5 text-violet-500" />
          <span className="text-[11px] font-black text-muted uppercase tracking-widest">Community Rules</span>
        </div>
        <ul className="space-y-3">
          {[
            "Share well-commented code. Don't dump raw solutions.",
            "Include Time & Space complexity in your write-up.",
            "Use images for complex tree or graph logic.",
          ].map((rule, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-muted leading-relaxed font-medium">
              <span className="w-5 h-5 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-500 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                {i + 1}
              </span>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}