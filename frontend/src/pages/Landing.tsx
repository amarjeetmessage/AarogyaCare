import { Link } from "react-router";
import SiteHeader from "../components/SiteHeader";

const capabilities = [
  ["01", "Health Guide", "A safer, conversational starting point for health questions—always clear about when to seek professional care."],
  ["02", "Care journeys", "Bring appointments, care plans, records, and check-ins into one understandable experience."],
  ["03", "Practice workspace", "Give care teams a calm, focused surface to coordinate patient communications and next steps."],
];

const outcomes = [
  ["Built for clarity", "Simple language, visible next steps, and thoughtful health-safety guardrails."],
  ["Privacy by design", "Session-aware access controls and a platform designed to minimize sensitive data exposure."],
  ["Human at the center", "AI supports better conversations—it does not replace clinical judgment or emergency care."],
];

export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fcfdfc] text-slate-900">
      <SiteHeader />
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(circle_at_78%_20%,rgba(20,184,166,.16),transparent_28%),radial-gradient(circle_at_18%_30%,rgba(125,211,252,.18),transparent_32%)]" />
        <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-18 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20 lg:pb-28 lg:pt-26">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold tracking-wide text-teal-800">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
              HEALTHCARE, MADE MORE HUMAN
            </div>
            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">Care that feels <span className="text-teal-700">clearer.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">AarogyaCare gives people and care teams a calmer way to navigate everyday health—one trusted place for questions, preparation, and progress.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-3.5 font-semibold text-white shadow-xl shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800">Create your free account <span className="ml-2">→</span></Link>
              <Link to="/products/health-guide" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3.5 font-semibold text-slate-800 transition hover:border-teal-300 hover:bg-teal-50">Explore the platform</Link>
            </div>
            <p className="mt-5 text-sm text-slate-500">Educational support, not diagnosis or emergency care.</p>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-teal-200/60 to-sky-100/50 blur-2xl" />
            <div className="rounded-[2rem] border border-white/90 bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-teal-100 font-bold text-teal-700">AC</div><div><p className="text-sm font-bold">Your care space</p><p className="text-xs text-slate-500">A calm place to start</p></div></div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Secure session</span>
              </div>
              <div className="space-y-4 py-5">
                <div className="rounded-2xl rounded-tl-sm bg-slate-100 p-4 text-sm leading-6 text-slate-700">I’d like to prepare for a conversation about persistent headaches.</div>
                <div className="ml-10 rounded-2xl rounded-tr-sm bg-teal-700 p-4 text-sm leading-6 text-white">I can help you organize what to discuss. How long have they been happening, and have you noticed any new or severe symptoms?</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-400">Ask a health question… <span className="float-right rounded-lg bg-teal-700 px-2 py-0.5 text-xs text-white">Send</span></div>
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:-left-10"><p className="text-xs font-semibold text-slate-500">A NEXT STEP, NOT A GUESS</p><p className="mt-1 text-sm font-bold text-slate-900">Better prepared conversations</p></div>
          </div>
        </div>
      </section>
      <section className="border-y border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-7 text-center sm:grid-cols-4 sm:px-8"><Stat value="24/7" label="Guided access" /><Stat value="1 place" label="For care context" /><Stat value="Clear" label="Safety boundaries" /><Stat value="Human" label="By design" /></div></section>
      <section id="outcomes" className="mx-auto max-w-7xl px-5 py-24 sm:px-8"><div className="max-w-2xl"><p className="text-sm font-bold tracking-[.16em] text-teal-700">THE AAROGYACARE STANDARD</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-slate-950 sm:text-5xl">Designed for the moments between appointments.</h2></div><div className="mt-14 grid gap-5 md:grid-cols-3">{capabilities.map(([number, title, body]) => <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/5"><span className="text-sm font-bold text-teal-700">{number}</span><h3 className="mt-12 text-xl font-bold text-slate-950">{title}</h3><p className="mt-3 leading-7 text-slate-600">{body}</p><Link to="/products/health-guide" className="mt-6 inline-flex text-sm font-bold text-slate-900 group-hover:text-teal-700">Learn more <span className="ml-2">→</span></Link></article>)}</div></section>
      <section id="security" className="bg-slate-950 py-24 text-white"><div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-bold tracking-[.16em] text-teal-300">TRUST IS THE PRODUCT</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">A gentler experience, backed by serious safeguards.</h2><p className="mt-6 max-w-md leading-7 text-slate-300">Health conversations deserve restraint. AarogyaCare is built around purposeful access, clear boundaries, and respectful communication.</p><Link to="/products" className="mt-8 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-100">See how it works</Link></div><div className="grid gap-4 sm:grid-cols-3">{outcomes.map(([title, body]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6"><div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400/15 text-teal-300">✓</div><h3 className="mt-8 font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{body}</p></div>)}</div></div></section>
      <section id="resources" className="mx-auto max-w-7xl px-5 py-24 sm:px-8"><div className="max-w-2xl"><p className="text-sm font-bold tracking-[.16em] text-teal-700">HELPFUL RESOURCES</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-slate-950 sm:text-5xl">Support that meets you where you are.</h2><p className="mt-4 leading-7 text-slate-600">Practical context for using AarogyaCare well—and knowing when a real-world care team is the right next step.</p></div><div className="mt-12 grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"><ResourceCard title="Prepare for an appointment" body="Turn a concern into a short list of observations and questions worth bringing to your clinician." /><ResourceCard title="Understand care boundaries" body="Learn what Health Guide can help with, and when urgent or professional care matters most." /></div><div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><p className="text-sm font-bold tracking-[.14em] text-slate-400">COMMON QUESTIONS</p><div className="mt-4 divide-y divide-slate-100"><Faq question="Is AarogyaCare a replacement for a clinician?" answer="No. It provides general health education and conversation preparation, not a diagnosis, treatment plan, or emergency service." /><Faq question="What should I do in an emergency?" answer="Contact local emergency services immediately for severe or life-threatening symptoms, such as chest pain, difficulty breathing, stroke symptoms, heavy bleeding, or loss of consciousness." /><Faq question="Who is Health Guide for?" answer="It is for people who want a clearer starting point for everyday health questions and more confident conversations with qualified care professionals." /></div></div></div><div className="mt-16 rounded-3xl bg-teal-700 px-7 py-12 text-white sm:px-12 sm:py-16"><p className="text-sm font-bold tracking-[.16em] text-teal-100">READY WHEN YOU ARE</p><div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><h2 className="max-w-2xl text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Start building a more confident care journey.</h2><Link to="/register" className="shrink-0 rounded-xl bg-white px-5 py-3.5 text-center font-bold text-teal-800 transition hover:bg-teal-50">Get started free</Link></div></div></section>
      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8"><p className="font-semibold text-slate-800">AarogyaCare</p><p>Educational healthcare support. For emergencies, contact local emergency services.</p></div></footer>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) { return <div><p className="text-xl font-bold text-slate-950">{value}</p><p className="mt-1 text-xs font-medium text-slate-500">{label}</p></div>; }
function ResourceCard({ title, body }: { title: string; body: string }) { return <article className="rounded-2xl border border-slate-200 bg-white p-6"><span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-50 text-teal-700">↗</span><h3 className="mt-6 font-bold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>; }
function Faq({ question, answer }: { question: string; answer: string }) { return <details className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">{question}<span className="text-xl font-normal text-teal-700 transition group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-3 text-sm leading-6 text-slate-600">{answer}</p></details>; }
