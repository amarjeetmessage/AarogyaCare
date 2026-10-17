import { Link } from "react-router";

type FeatureCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  action: string;
  to?: string;
};

const features: FeatureCardProps[] = [
  {
    eyebrow: "HEALTH GUIDE",
    title: "Start with a question",
    body: "Get general educational support and a clearer frame for your next step.",
    action: "Open guide",
    to: "/chat",
  },
  {
    eyebrow: "CARE PREP",
    title: "Prepare for a visit",
    body: "Capture symptoms, questions, and observations to discuss with your care team.",
    action: "Coming soon",
  },
  {
    eyebrow: "RESOURCES",
    title: "Learn at your pace",
    body: "Plain-language health information designed to help you ask better questions.",
    action: "Explore platform",
    to: "/products",
  },
];

export function DashboardFeatureGrid() {
  return (
    <div id="care-plan" className="mt-8 grid gap-5 md:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}

function FeatureCard({ eyebrow, title, body, action, to }: FeatureCardProps) {
  const content = (
    <>
      <p className="text-xs font-bold tracking-[.14em] text-teal-700">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-lg font-bold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
      <p className="mt-6 text-sm font-bold text-slate-800">
        {action} <span className="ml-1">→</span>
      </p>
    </>
  );

  return to ? (
    <Link
      to={to}
      className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lg hover:shadow-slate-200/50"
    >
      {content}
    </Link>
  ) : (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 opacity-75">
      {content}
    </article>
  );
}
