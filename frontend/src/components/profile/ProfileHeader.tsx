"use client";

import { useState } from "react";
import type { UserProfile } from "@/types/profile";
import { updateProfileData } from "@/api/profile.api";
// 👇 FIX: Added ExternalLink from lucide-react
import { Mail, Calendar, Edit2, Check, X, MapPin, Medal, ExternalLink } from "lucide-react";
// 👇 FIX: Imported Link from Next.js
import Link from "next/link";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

export default function ProfileHeader({ user: initialUser }: { user: UserProfile }) {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || "",
    bio: user.bio || "",
    college: user.college || "",
    github: user.socialLinks?.github || "",
    linkedin: user.socialLinks?.linkedin || "",
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await updateProfileData({
        username: formData.username,
        bio: formData.bio,
        college: formData.college,
        socialLinks: { github: formData.github, linkedin: formData.linkedin },
      });
      setUser(res.user);
      setIsEditing(false);
      toast.success(res.message);
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-3xl bg-linear-to-br from-accent/10 via-purple-500/10 to-pink-500/10 border border-accent/20 p-8 md:p-10 overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative flex flex-col md:flex-row items-start gap-8">
        {/* Avatar */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-4xl bg-linear-to-br from-accent to-purple-500 flex items-center justify-center text-4xl font-black text-white shadow-2xl shrink-0 rotate-3 hover:rotate-0 transition-transform duration-300">
          {user.name.charAt(0).toUpperCase()}
        </div>

        {/* User Info & Edit Form */}
        <div className="flex-1 w-full space-y-4">
          {!isEditing ? (
            // VIEW MODE
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-foreground flex items-center gap-3">
                    {user.name}
                    {user.badges?.includes("Top_Thinker") && (
                      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-1 rounded-full" title="Top Thinker">
                        <Medal className="w-5 h-5" />
                      </div>
                    )}
                  </h1>

                  {/* 👇 FIX: Displaying Username and Public Profile Link together */}
                  <div className="flex items-center gap-3 mt-1.5">
                    <p className="text-accent font-medium text-lg">@{user.username || "setup_username"}</p>

                    {/* Sirf tabhi dikhega jab user ne username set kar liya ho */}
                    {user.username && (
                      <Link
                        href={`/u/${user.username}`}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-accent/20 hover:-translate-y-0.5 transition-all shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Public View
                      </Link>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/50 border border-border-subtle hover:bg-white/5 transition-colors text-sm font-semibold"
                >
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </button>
              </div>

              {user.bio && <p className="text-muted leading-relaxed max-w-2xl">{user.bio}</p>}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted font-medium pt-2">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-purple-400" /> {user.email}</div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400" /> Joined {new Date(user.dateOfJoining).getFullYear()}</div>
                {user.college && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-pink-400" /> {user.college}</div>}
              </div>
            </>
          ) : (
            // EDIT MODE
            <div className="space-y-4 bg-background-secondary/80 backdrop-blur-md p-6 rounded-2xl border border-border-subtle">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted uppercase">Username</label>
                  <input type="text" className="w-full mt-1 bg-background border border-border-subtle rounded-lg p-2.5 text-sm focus:ring-2 outline-none"
                    value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} placeholder="vishnu_shukla" />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted uppercase">College</label>
                  <input type="text" className="w-full mt-1 bg-background border border-border-subtle rounded-lg p-2.5 text-sm focus:ring-2 outline-none"
                    value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} placeholder="e.g. IIT Delhi" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase">Bio</label>
                <textarea className="w-full mt-1 bg-background border border-border-subtle rounded-lg p-2.5 text-sm focus:ring-2 outline-none resize-none"
                  rows={2} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Tell the community about yourself..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted uppercase">GitHub URL</label>
                  <input type="text" className="w-full mt-1 bg-background border border-border-subtle rounded-lg p-2.5 text-sm focus:ring-2 outline-none"
                    value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted uppercase">LinkedIn URL</label>
                  <input type="text" className="w-full mt-1 bg-background border border-border-subtle rounded-lg p-2.5 text-sm focus:ring-2 outline-none"
                    value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle text-sm font-semibold hover:bg-background transition-colors">
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-6 py-2 rounded-xl bg-foreground text-background text-sm font-bold shadow-md hover:scale-[1.02] transition-all disabled:opacity-50">
                  {loading ? "Saving..." : <><Check className="w-4 h-4" /> Save Changes</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}