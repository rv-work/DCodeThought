"use client";

import { useMemo } from "react";
import { HeatmapData } from "@/api/activity.api";

interface ActivityHeatmapProps {
  data: HeatmapData[];
}

export default function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  // Generate the last 365 days array
  const days = useMemo(() => {
    const result = [];
    const today = new Date();

    // Create a map for quick O(1) lookups
    const activityMap = new Map(data.map((item) => [item.date, item.count]));

    for (let i = 365; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split("T")[0];

      result.push({
        date: dateString,
        count: activityMap.get(dateString) || 0,
      });
    }
    return result;
  }, [data]);

  // Color logic based on activity count (DCodeThought Theme)
  const getColorClass = (count: number) => {
    if (count === 0) return "bg-background-tertiary border-border-subtle/30";
    if (count === 1) return "bg-purple-900/50 border-purple-800/50 shadow-[0_0_5px_rgba(147,51,234,0.2)]";
    if (count <= 3) return "bg-purple-600/70 border-purple-500/50 shadow-[0_0_8px_rgba(147,51,234,0.4)]";
    if (count <= 5) return "bg-purple-500 border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]";
    return "bg-fuchsia-400 border-fuchsia-300 shadow-[0_0_15px_rgba(232,121,249,0.8)] text-white";
  };

  // Group into weeks (columns) to render as a grid easily
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const totalSubmissions = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="relative p-8 rounded-4xl bg-background-secondary/40 backdrop-blur-xl border border-border-subtle shadow-2xl overflow-hidden group">
      {/* Background ambient glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-colors duration-500 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-extrabold text-foreground tracking-tight">Consistency Graph</h3>
          <p className="text-muted text-sm mt-1">Your coding activity over the last year</p>
        </div>
        <div className="flex items-center gap-6 px-5 py-3 rounded-2xl bg-background/50 border border-border-subtle">
          <div className="text-center">
            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Total Solved</div>
            <div className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
              {totalSubmissions}
            </div>
          </div>
        </div>
      </div>

      {/* The Scrollable Grid */}
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="inline-flex gap-1.5 min-w-max">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1.5">
              {week.map((day, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  title={`${day.count} submissions on ${day.date}`}
                  className={`w-3.5 h-3.5 rounded-[3px] border transition-all duration-300 cursor-pointer hover:scale-125 hover:z-10 ${getColorClass(day.count)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-end gap-2 text-xs font-medium text-muted">
        <span>Less</span>
        <div className="w-3.5 h-3.5 rounded-[3px] bg-background-tertiary border border-border-subtle/30" />
        <div className="w-3.5 h-3.5 rounded-[3px] bg-purple-900/50 border border-purple-800/50" />
        <div className="w-3.5 h-3.5 rounded-[3px] bg-purple-600/70 border border-purple-500/50" />
        <div className="w-3.5 h-3.5 rounded-[3px] bg-purple-500 border border-purple-400" />
        <div className="w-3.5 h-3.5 rounded-[3px] bg-fuchsia-400 border border-fuchsia-300" />
        <span>More</span>
      </div>
    </div>
  );
}