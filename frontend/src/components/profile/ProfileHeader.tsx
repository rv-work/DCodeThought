import type { UserProfile } from "@/types/profile";
import { User, Mail, Calendar } from "lucide-react";

export default function ProfileHeader({ user }: { user: UserProfile }) {
  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-accent/10 via-purple-500/10 to-pink-500/10 border border-accent/20 p-10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative flex items-start gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white shadow-2xl flex-shrink-0">
          <User className="w-12 h-12" />
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  Joined{" "}
                  {new Date(user.dateOfJoining).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 rounded-lg bg-background-secondary border border-border text-sm font-semibold">
              <span className="text-muted">Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute bottom-6 right-6 w-20 h-20 border-l-2 border-b-2 border-accent/20 rounded-bl-2xl" />
    </div>
  );
}