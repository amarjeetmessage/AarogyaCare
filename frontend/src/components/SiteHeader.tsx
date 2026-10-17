import { useState } from "react";
import { Link } from "react-router";

const navItems = [
  { label: "Platform", to: "/products" },
  { label: "Outcomes", to: "/#outcomes" },
  { label: "Security", to: "/security" },
  { label: "Resources", to: "/resources" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-5 py-4 sm:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={close} className="flex items-center gap-2.5 font-bold tracking-tight text-slate-950 focus-visible:rounded-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-700 text-lg text-white shadow-lg shadow-teal-700/20">✦</span>
            <span>Aarogya<span className="text-teal-700">Care</span></span>
          </Link>
          <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            {navItems.map((item) => <Link key={item.label} to={item.to} className="rounded-md px-1 py-1 transition hover:text-teal-700 focus-visible:text-teal-800">{item.label}</Link>)}
          </div>
          <div className="hidden items-center gap-2.5 text-sm font-semibold sm:flex">
            <Link to="/login" className="rounded-lg px-4 py-2 text-slate-700 transition hover:bg-slate-100">Sign in</Link>
            <Link to="/register" className="rounded-lg bg-slate-950 px-4 py-2 text-white shadow-sm transition hover:bg-teal-700">Get started</Link>
          </div>
          <button type="button" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen} aria-controls="mobile-navigation" className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-teal-600 sm:hidden">
            <span className="sr-only">{isOpen ? "Close navigation" : "Open navigation"}</span>
            <span aria-hidden="true" className="text-xl leading-none">{isOpen ? "×" : "☰"}</span>
          </button>
        </div>
        {isOpen && <div id="mobile-navigation" className="mt-4 border-t border-slate-100 pt-3 md:hidden"><div className="grid gap-1">{navItems.map((item) => <Link key={item.label} to={item.to} onClick={close} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-800">{item.label}</Link>)}</div><div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3"><Link to="/login" onClick={close} className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-sm font-semibold text-slate-700">Sign in</Link><Link to="/register" onClick={close} className="rounded-lg bg-teal-700 px-3 py-2.5 text-center text-sm font-semibold text-white">Get started</Link></div></div>}
      </nav>
    </header>
  );
}
