import { Link } from "react-router";

export function DashboardNavigation() {
  return (
    <aside className="hidden lg:block">
      <p className="px-3 text-xs font-bold tracking-[.15em] text-slate-400">
        WORKSPACE
      </p>
      <nav
        className="mt-4 space-y-1 text-sm font-semibold"
        aria-label="Dashboard"
      >
        <a
          href="#overview"
          className="flex items-center gap-3 rounded-lg bg-teal-50 px-3 py-2.5 text-teal-800"
        >
          ⌂ Overview
        </a>
        <Link
          to="/chat"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition hover:bg-white hover:text-slate-950"
        >
          ✦ Health Guide
        </Link>
        <a
          href="#care-plan"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition hover:bg-white hover:text-slate-950"
        >
          □ Care plan
        </a>
        <a
          href="#resources"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition hover:bg-white hover:text-slate-950"
        >
          ◌ Resources
        </a>
      </nav>
      <div className="mt-10 rounded-2xl bg-slate-900 p-5 text-white">
        <p className="text-xs font-bold tracking-[.12em] text-teal-300">
          YOUR SPACE
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          A private place to prepare for better care conversations.
        </p>
      </div>
    </aside>
  );
}
