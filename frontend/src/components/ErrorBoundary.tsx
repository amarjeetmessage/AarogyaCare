import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("Application error", error, info); }
  render() { if (!this.state.hasError) return this.props.children; return <main className="grid min-h-screen place-items-center bg-slate-50 px-5"><div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/40"><p className="text-sm font-bold tracking-[.14em] text-teal-700">AAROGYACARE</p><h1 className="mt-4 text-2xl font-bold text-slate-950">Something went wrong.</h1><p className="mt-3 leading-7 text-slate-600">Please refresh the page or return home to continue.</p><Link to="/" className="mt-7 inline-flex rounded-xl bg-teal-700 px-4 py-2.5 font-semibold text-white">Return home</Link></div></main>; }
}
