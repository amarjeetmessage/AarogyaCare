import { Link } from "react-router";
import type { User } from "../../lib/api";

export function DashboardAccountCard({ user }: { user: User | null }) {
  const firstName = user?.firstName || "there";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7">
      <p className="text-xs font-bold tracking-[.14em] text-slate-400">
        ACCOUNT STATUS
      </p>
      <div className="mt-7 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-teal-100 font-bold text-teal-700">
          {firstName.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-slate-950">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-slate-500">{user?.email}</p>
        </div>
      </div>
      <div className="mt-7 border-t border-slate-100 pt-5">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Secure session active
        </span>
      </div>
      <Link
        to="/profile"
        className="mt-5 inline-flex text-sm font-semibold text-teal-700 hover:underline"
      >
        Manage account
      </Link>
    </article>
  );
}
