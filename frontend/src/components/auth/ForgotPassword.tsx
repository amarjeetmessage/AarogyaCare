import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { api } from "../../lib/api";
import { AuthShell } from "./LoginForm";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setToken("");
    setBusy(true);
    try {
      const result = await api("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: email.trim() }),
      });
      setMessage(result.message || "Check your email for reset instructions.");
      if (result.resetToken) setToken(result.resetToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to request reset");
    } finally {
      setBusy(false);
    }
  };
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We’ll help you get back into your account"
    >
      <form onSubmit={submit} className="space-y-5">
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
          />
        </label>
        {error && <p className="text-sm text-red-700">{error}</p>}
        {message && (
          <p className="rounded-lg bg-teal-50 p-3 text-sm text-teal-800">
            {message}
          </p>
        )}
        {token && (
          <Link
            to={`/reset-password?token=${encodeURIComponent(token)}`}
            className="block break-all rounded-lg bg-amber-50 p-3 text-xs font-semibold text-amber-800 hover:bg-amber-100"
          >
            Development: continue to reset password →
          </Link>
        )}
        <button
          disabled={busy}
          className="w-full rounded-xl bg-teal-700 py-3 font-semibold text-white disabled:opacity-60"
        >
          {busy ? "Sending instructions…" : "Send reset instructions"}
        </button>
        <p className="text-center text-sm">
          <Link className="text-teal-700 hover:underline" to="/login">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
