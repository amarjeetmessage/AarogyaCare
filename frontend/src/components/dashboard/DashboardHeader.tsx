import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

export function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-700 text-sm text-white">
            ✦
          </span>
          Aarogya<span className="-ml-2 text-teal-700">Care</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-slate-500 sm:block">
            {user?.email}
          </span>
          <button
            onClick={logout}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
