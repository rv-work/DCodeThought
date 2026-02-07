import type { UserProfile } from "@/types/profile";

export default function ProfileHeader({
  user,
}: {
  user: UserProfile;
}) {
  return (
    <div className="border p-4 rounded">
      <div className="font-semibold">{user.name}</div>
      <div className="text-sm">{user.email}</div>
      <div className="text-xs">
        Joined: {new Date(user.dateOfJoining).toDateString()}
      </div>
    </div>
  );
}
