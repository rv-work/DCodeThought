"use client";

import Protected from "@/components/Protected";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/Loader";

export default function ProfilePage() {
  return (
    <Protected>
      <ProfileContent />
    </Protected>
  );
}

function ProfileContent() {
  const { user, logout, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return null; // Protected already redirects

  return (
    <div className="max-w-xl mx-auto space-y-6">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold">👤 Your Profile</h1>

      {/* PROFILE CARD */}
      <div className="p-6 rounded-lg bg-card border border-border shadow-card">
        <h2 className="text-xl font-semibold mb-4">Personal Info</h2>

        <div className="space-y-2">
          <div>
            <p className="text-sm text-muted dark:text-muted-dark">Name</p>
            <p className="text-lg font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted dark:text-muted-dark">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted dark:text-muted-dark">Role</p>
            <p className="text-lg font-medium capitalize">{user.role}</p>
          </div>

          <div>
            <p className="text-sm text-muted dark:text-muted-dark">Joined On</p>
            <p className="text-lg font-medium">
              {user.createdAt
                ? new Date(user.createdAt).toDateString()
                : "—"}
            </p>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="
            mt-6 px-4 py-2 rounded-lg 
            bg-red-500 hover:bg-red-600 text-white
          "
        >
          Logout
        </button>
      </div>

      {/* FUTURE MODULE CARDS */}
      <div className="grid gap-4 md:grid-cols-2">

        <div className="p-4 rounded-lg bg-card border border-border shadow-card">
          <p className="text-sm text-muted dark:text-muted-dark">Bookmarks</p>
          <h3 className="text-2xl font-bold">0</h3>
        </div>

        <div className="p-4 rounded-lg bg-card border border-border shadow-card">
          <p className="text-sm text-muted dark:text-muted-dark">Notes</p>
          <h3 className="text-2xl font-bold">0</h3>
        </div>

        <div className="p-4 rounded-lg bg-card border border-border shadow-card">
          <p className="text-sm text-muted dark:text-muted-dark">Comments</p>
          <h3 className="text-2xl font-bold">0</h3>
        </div>

        <div className="p-4 rounded-lg bg-card border border-border shadow-card">
          <p className="text-sm text-muted dark:text-muted-dark">POTD Streak</p>
          <h3 className="text-2xl font-bold">0 🔥</h3>
        </div>
      </div>
    </div>
  );
}
