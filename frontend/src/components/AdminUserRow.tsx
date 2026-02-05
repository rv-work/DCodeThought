"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";

export default function AdminUserRow({
  user,
  refresh,
}: {
  user: any;
  refresh: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const deleteUser = async () => {
    if (!confirm("Delete this user?")) return;

    setDeleting(true);
    try {
      await api.delete(API.user.delete(user._id));
      refresh();
    } catch (err) {
      console.error(err);
    }
    setDeleting(false);
  };

  return (
    <div className="p-4 border border-border bg-card rounded-lg shadow-card flex items-center justify-between">

      {/* LEFT */}
      <div>
        <h3 className="text-lg font-semibold">{user.name}</h3>

        <p className="text-sm text-muted dark:text-muted-dark">{user.email}</p>

        <p className="text-sm mt-1">
          Role:{" "}
          <span
            className={`px-2 py-1 rounded text-xs
              ${user.role === "admin"
                ? "bg-primary text-white"
                : "bg-background border border-border"
              }
            `}
          >
            {user.role}
          </span>
        </p>

        <p className="text-xs text-muted dark:text-muted-dark mt-1">
          Joined: {new Date(user.createdAt).toDateString()}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <button
          onClick={deleteUser}
          disabled={deleting || user.role === "admin"}
          className={`px-3 py-1 rounded text-white 
            ${user.role === "admin"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
            }
          `}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
