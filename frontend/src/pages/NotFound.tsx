import { Link } from "react-router";
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5">
      <div className="max-w-md text-center">
        <p className="text-sm font-bold tracking-[.16em] text-teal-700">
          404 · PAGE NOT FOUND
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-.05em] text-slate-950">
          This page is not here.
        </h1>
        <p className="mt-5 leading-7 text-slate-600">
          The link may be outdated, or the page may have moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
        >
          Back to AarogyaCare
        </Link>
      </div>
    </main>
  );
}
