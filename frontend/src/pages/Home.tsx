import { Link } from "react-router";
import { DashboardAccountCard } from "../components/dashboard/DashboardAccountCard";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardNavigation } from "../components/dashboard/DashboardNavigation";
import { DashboardSafetyNotice } from "../components/dashboard/DashboardSafetyNotice";
import { DashboardFeatureGrid } from "../components/dashboard/DashboardFeatureGrid";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardHeader />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[220px_1fr] lg:py-12">
        <DashboardNavigation />
        <section id="overview">
          <DashboardWelcome
            firstName={user?.firstName || "there"}
            role={user?.role || "Patient"}
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
            <DashboardNextStep />
            <DashboardAccountCard user={user} />
          </div>
          <DashboardFeatureGrid />
          <DashboardSafetyNotice />
        </section>
      </div>
    </main>
  );
}

function DashboardWelcome({
  firstName,
  role,
}: {
  firstName: string;
  role: string;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-bold text-teal-700">{role} workspace</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-[-.04em] text-slate-950">
          Good to see you, {firstName}.
        </h1>
        <p className="mt-3 max-w-xl leading-7 text-slate-600">
          Here is a quiet place to organize questions, find helpful resources,
          and decide what to do next.
        </p>
      </div>
      <Link
        to="/chat"
        className="inline-flex shrink-0 items-center justify-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white shadow-lg shadow-teal-700/15 transition hover:bg-teal-800"
      >
        Open Health Guide <span className="ml-2">→</span>
      </Link>
    </div>
  );
}

function DashboardNextStep() {
  return (
    <article className="rounded-3xl bg-slate-950 p-7 text-white sm:p-8">
      <span className="inline-flex rounded-full bg-teal-400/15 px-3 py-1 text-xs font-bold text-teal-200">
        YOUR NEXT STEP
      </span>
      <h2 className="mt-5 max-w-lg text-2xl font-semibold tracking-[-.03em]">
        Bring more confidence to your next care conversation.
      </h2>
      <p className="mt-3 max-w-lg leading-7 text-slate-300">
        Use Health Guide to turn a concern into a concise list of questions and
        relevant details to share with a qualified clinician.
      </p>
      <Link
        to="/chat"
        className="mt-7 inline-flex rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-teal-100"
      >
        Start a conversation
      </Link>
    </article>
  );
}
