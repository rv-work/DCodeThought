
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import {
  getProfile,
  getMyReports,
  getMyRequests,
  getMyRecentProblems,
} from "@/api/profile.api";
import { getMyHeatmap, type HeatmapData } from "@/api/activity.api"; // NEW IMPORT

import ProfileHeader from "@/components/profile/ProfileHeader";
import RecentProblems from "@/components/profile/RecentProblems";
import MyRequests from "@/components/profile/MyRequests";
import MyReports from "@/components/profile/MyReports";
import ActivityHeatmap from "@/components/profile/ActivityHeatmap"; // NEW IMPORT

import type {
  UserProfile,
  MyReport,
  MyRequest,
  RecentView,
} from "@/types/profile";
import { User, Activity, MessageSquare, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reports, setReports] = useState<MyReport[]>([]);
  const [requests, setRequests] = useState<MyRequest[]>([]);
  const [recent, setRecent] = useState<RecentView[]>([]);
  const [heatmap, setHeatmap] = useState<HeatmapData[]>([]); // NEW STATE
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Fetching Heatmap parallelly with other data for speed
        const [p, r, req, rec, h] = await Promise.all([
          getProfile(),
          getMyReports(),
          getMyRequests(),
          getMyRecentProblems(),
          getMyHeatmap(), // NEW API CALL
        ]);

        setProfile(p.user);
        setReports(r.reports);
        setRequests(req.requests);
        setRecent(rec.recent);
        setHeatmap(h.heatmap); // SETTING HEATMAP DATA
      } catch (err) {
        toast.error(parseError(err));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

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

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none animate-float"></div>
        <div className="absolute bottom-1/4 right-0 w-125 h-125 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" style={{ animationDelay: '2s' }}></div>

        {/* Hero Section */}
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

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 space-y-10 relative z-10">

          {/* Profile Header */}
          <div className="animate-fade-in-up">
            <ProfileHeader user={profile} />
          </div>

          {/* NEW: Heatmap Consistency Graph */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <ActivityHeatmap data={heatmap} />
          </div>

          {/* High-Level Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>

            {/* Stat Card 1 */}
            <div className="relative rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-blue-500/20 p-8 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
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

            {/* Stat Card 2 */}
            <div className="relative rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-purple-500/20 p-8 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
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

            {/* Stat Card 3 */}
            <div className="relative rounded-4xl bg-background-secondary/60 backdrop-blur-md border border-orange-500/20 p-8 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-transparent opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
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

          {/* Activity Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <RecentProblems recent={recent} />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <MyRequests requests={requests} />
            </div>
          </div>

          {/* Full Width Section */}
          <div className="animate-fade-in-up pb-12" style={{ animationDelay: "0.5s" }}>
            <MyReports reports={reports} />
          </div>

        </div>
      </div>
    </>
  );
}