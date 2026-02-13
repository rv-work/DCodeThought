"use client";

import { useEffect, useState } from "react";
import { getAdminPotds, deleteAdminPotd } from "@/api/admin.potd.api";
import type { PotdProblem } from "@/types/potd";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import Link from "next/link";

export default function AdminPotdPage() {
  const [potds, setPotds] = useState<PotdProblem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminPotds().then((res) => {
      setPotds(res.potds);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <AdminLoading text="Loading POTDs..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Problem of the Day"
        description="Schedule and manage daily problems"
        action={
          <Link
            href="/admin/potd/add"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-accent to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add POTD
          </Link>
        }
      />

      {potds.length === 0 ? (
        <AdminEmptyState
          title="No POTDs published"
          description="Publish your first Problem of the Day to get started."
          action={
            <Link
              href="/admin/potd/add"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-accent to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Publish First POTD
            </Link>
          }
          icon={
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-orange-500/10 to-yellow-500/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
            </div>
          }
        />
      ) : (
        <div className="grid gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
          {potds.map((p, idx) => (
            <div
              key={p._id}
              className="group card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Date Badge */}
                  <div className="w-16 h-16 rounded-xl bg-linear-to-br from-orange-500 to-yellow-500 flex flex-col items-center justify-center text-white shadow-lg shrink-0">
                    <div className="text-xs font-semibold">
                      {new Date(p.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                    </div>
                    <div className="text-2xl font-bold">
                      {new Date(p.date).getDate()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-semibold">
                        #{p.problem.problemNumber}
                      </span>
                      <h3 className="font-bold text-lg group-hover:text-accent transition-colors">
                        {p.problem.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(p.date).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/potd/${p._id}/edit`}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm font-medium cursor-pointer group/btn"
                  >
                    <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>

                  <button
                    onClick={async () => {
                      if (confirm("Are you sure you want to remove this POTD?")) {
                        await deleteAdminPotd(p._id);
                        setPotds((x) => x.filter((y) => y._id !== p._id));
                      }
                    }}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 text-sm font-medium cursor-pointer group/btn"
                  >
                    <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}