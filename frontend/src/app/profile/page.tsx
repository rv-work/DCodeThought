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

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reports, setReports] = useState<MyReport[]>([]);
  const [requests, setRequests] = useState<MyRequest[]>([]);
  const [recent, setRecent] = useState<RecentView[]>([]);

  useEffect(() => {
    getProfile().then((res) => setProfile(res.user));
    getMyReports().then((res) => setReports(res.reports));
    getMyRequests().then((res) => setRequests(res.requests));
    getMyRecentProblems().then((res) => setRecent(res.recent));
  }, []);

  if (!profile) return null;

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ProfileHeader user={profile} />

        <RecentProblems recent={recent} />

        <MyRequests requests={requests} />

        <MyReports reports={reports} />
      </div>
    </>
  );
}
