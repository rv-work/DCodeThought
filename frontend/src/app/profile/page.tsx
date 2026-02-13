"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import {
  getProfile,
  getMyReports,
  getMyRequests,
  getMyRecentProblems,
} from "@/api/profile.api";

import ProfileHeader from "@/components/profile/ProfileHeader";
import RecentProblems from "@/components/profile/RecentProblems";
import MyRequests from "@/components/profile/MyRequests";
import MyReports from "@/components/profile/MyReports";

import type {
  UserProfile,
  MyReport,
  MyRequest,
  RecentView,
} from "@/types/profile";
import { User, TrendingUp } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reports, setReports] = useState<MyReport[]>([]);
  const [requests, setRequests] = useState<MyRequest[]>([]);
  const [recent, setRecent] = useState<RecentView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProfile().then((res) => setProfile(res.user)),
      getMyReports().then((res) => setReports(res.reports)),
      getMyRequests().then((res) => setRequests(res.requests)),
      getMyRecentProblems().then((res) => setRecent(res.recent)),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
            <p className="text-muted">Please log in to view your profile</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="text-center space-y-6 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              <User className="w-4 h-4" />
              Your Profile
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              My Dashboard
            </h1>

            {/* Description */}
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Track your progress, manage requests, and view your activity
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {/* Profile Header */}
          <div className="animate-fade-in-up">
            <ProfileHeader user={profile} />
          </div>

          {/* Stats Overview */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted">Recent Views</span>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-bold">{recent.length}</div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted">My Requests</span>
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-3xl font-bold">{requests.length}</div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted">My Reports</span>
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-3xl font-bold">{reports.length}</div>
            </div>
          </div>

          {/* Activity Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Problems */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <RecentProblems recent={recent} />
            </div>

            {/* My Requests */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <MyRequests requests={requests} />
            </div>
          </div>

          {/* My Reports */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <MyReports reports={reports} />
          </div>
        </div>
      </div>
    </>
  );
}