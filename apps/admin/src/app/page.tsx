"use client";

import { useState, useCallback } from "react";
import {
  Shield,
  Users,
  Crown,
  User,
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

interface AdminUser {
  id: number;
  email: string;
  name: string;
  plan: "free" | "pro";
  createdAt: number;
  signatureCount: number;
}

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchUsers = useCallback(async (s: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users", {
        headers: { "x-admin-secret": s },
      });
      if (res.status === 401) {
        setError("Wrong secret.");
        setAuthed(false);
        setLoading(false);
        return;
      }
      const json = (await res.json()) as { users: AdminUser[] };
      setUsers(json.users);
      setAuthed(true);
    } catch {
      setError("Failed to fetch.");
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(secret);
  };

  const setPlan = async (userId: number, plan: "free" | "pro") => {
    setUpdating(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}/plan`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) {
        showToast("Update failed.", false);
        setUpdating(null);
        return;
      }
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, plan } : u)),
      );
      showToast(
        plan === "pro" ? "✓ Upgraded to Pro" : "Downgraded to Free",
        plan === "pro",
      );
    } catch {
      showToast("Network error.", false);
    }
    setUpdating(null);
  };

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase()),
  );

  const proCount = users.filter((u) => u.plan === "pro").length;

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm">
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Meishi Admin</h1>
            <p className="text-sm text-slate-500">
              Enter your admin secret to continue
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Admin secret"
              autoFocus
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10"
            />
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-red-500">
                <XCircle className="h-3.5 w-3.5" />
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={!secret.trim() || loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-600 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Meishi Admin</h1>
              <p className="text-xs text-slate-500">User management</p>
            </div>
          </div>
          <button
            onClick={() => fetchUsers(secret)}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all hover:border-slate-300 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {(
            [
              {
                label: "Total users",
                value: users.length,
                icon: Users,
                cls: "text-slate-600 bg-slate-100",
              },
              {
                label: "Pro users",
                value: proCount,
                icon: Crown,
                cls: "text-amber-600 bg-amber-50",
              },
              {
                label: "Free users",
                value: users.length - proCount,
                icon: User,
                cls: "text-sky-600 bg-sky-50",
              },
            ] as const
          ).map(({ label, value, icon: Icon, cls }) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${cls}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Table */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-8 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left">
                  {["User", "Signatures", "Joined", "Plan", "Action"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-sm text-slate-400"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr
                      key={u.id}
                      className="transition-colors hover:bg-slate-50/80"
                    >
                      {/* User */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-600">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {u.name}
                            </p>
                            <p className="text-xs text-slate-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Signatures */}
                      <td className="px-4 py-3">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                          {u.signatureCount}
                        </span>
                      </td>
                      {/* Joined */}
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {new Date(u.createdAt * 1000).toLocaleDateString(
                          "ja-JP",
                        )}
                      </td>
                      {/* Plan badge */}
                      <td className="px-4 py-3">
                        {u.plan === "pro" ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600">
                            <Crown className="h-3 w-3" /> Pro
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                            Free
                          </span>
                        )}
                      </td>
                      {/* Action */}
                      <td className="px-4 py-3">
                        {updating === u.id ? (
                          <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                        ) : u.plan === "pro" ? (
                          <button
                            onClick={() => setPlan(u.id, "free")}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 transition-all hover:border-red-200 hover:text-red-500 active:scale-[0.97] cursor-pointer"
                          >
                            Downgrade
                          </button>
                        ) : (
                          <button
                            onClick={() => setPlan(u.id, "pro")}
                            className="inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-600 transition-all hover:bg-amber-100 active:scale-[0.97] cursor-pointer"
                          >
                            <Crown className="h-3 w-3" /> Upgrade Pro
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg transition-all ${
            toast.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {toast.ok ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
