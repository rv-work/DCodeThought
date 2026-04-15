"use client";

import Link from "next/link";
import { Target, Award, Calendar } from "lucide-react";
import { sidebarCardCls } from "./constants";
import { User } from "@/types/user";

export default function RightSidebar({ user }: { user: User | null }) {
  return (
    <aside className="hidden xl:flex flex-col gap-4 h-full overflow-y-auto scrollbar-hide pt-6 pb-6">
      <div className={`${sidebarCardCls} border-violet-500/25 bg-linear-to-br from-violet-500/10 to-blue-500/5`}>
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-black text-amber-500 uppercase tracking-widest">Active Challenge</span>
        </div>
        {user?.challenge?.activeDays ? (
          <>
            <p className="text-sm font-bold text-foreground mb-0.5">
              Maintain {user.challenge.activeDays} Days Streak
            </p>
            <p className="text-xs text-muted mb-3 font-medium">
              {user.challenge.progress} of {user.challenge.activeDays} completed
            </p>
            <div className="h-2 bg-background rounded-full overflow-hidden border border-border-subtle">
              <div
                className="h-full bg-linear-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((user.challenge.progress / user.challenge.activeDays) * 100, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-muted mt-1.5 text-right font-bold">
              {Math.round((user.challenge.progress / user.challenge.activeDays) * 100)}%
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-bold text-foreground mb-2">No Active Challenge</p>
            <Link
              href="/challenges"
              className="block text-center w-full py-2 bg-amber-500/10 border border-amber-500/25 text-amber-500 rounded-xl text-xs font-bold hover:bg-amber-500 hover:text-background transition-all"
            >
              Join a Challenge →
            </Link>
          </>
        )}
      </div>

      <div className={sidebarCardCls}>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[11px] font-black text-muted uppercase tracking-widest">Top Thinkers</span>
        </div>
        <div className="text-center py-2">
          <p className="text-sm font-bold text-foreground mb-1">Check Global Rankings</p>
          <p className="text-xs text-muted mb-4">See where you stand among top developers.</p>
          <Link
            href="/leaderboard"
            className="w-full inline-block py-2.5 bg-background border border-border-subtle rounded-xl text-xs font-bold text-foreground hover:bg-foreground/5 transition-all"
          >
            View Leaderboard
          </Link>
        </div>
      </div>

      <div className={sidebarCardCls}>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-[11px] font-black text-muted uppercase tracking-widest">Problem of the Day</span>
        </div>
        <div className="bg-background border border-border-subtle rounded-2xl p-4">
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1.5">Solve & Earn</p>
          <p className="text-sm font-bold text-foreground mb-3 leading-snug">
            Boost your streak by solving today&apos;s POTD.
          </p>
          <Link
            href="/potd"
            className="block text-center w-full py-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 rounded-xl text-xs font-bold hover:bg-emerald-500 hover:text-background hover:border-emerald-500 transition-all"
          >
            Solve POTD →
          </Link>
        </div>
      </div>
    </aside>
  );
}