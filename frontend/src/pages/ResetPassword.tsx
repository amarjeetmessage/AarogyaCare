import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import { AuthShell } from "../components/auth/LoginForm";
import { api } from "../lib/api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!token)
      return setError(
        "This reset link is missing its token. Request a new password reset link.",
      );
    if (password.length < 12)
      return setError("Password must be at least 12 characters.");
    if (password !== confirmation) return setError("Passwords do not match.");
    setBusy(true);
    try {
      await api("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      setSuccess(true);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to reset password.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Use at least 12 characters to keep your account protected"
    >
      {success ? (
        <div className="space-y-5">
          <p className="rounded-xl bg-teal-50 p-4 text-sm leading-6 text-teal-900">
            Your password has been reset. You can now sign in with your new
            password.
          </p>
          <Link
            to="/login"
            className="block rounded-xl bg-teal-700 py-3 text-center font-semibold text-white"
          >
            Go to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <Field label="New password" value={password} onChange={setPassword} />
          <Field
            label="Confirm new password"
            value={confirmation}
            onChange={setConfirmation}
          />
          {error && (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            disabled={busy}
            className="w-full rounded-xl bg-teal-700 py-3 font-semibold text-white disabled:opacity-60"
          >
            {busy ? "Updating password…" : "Reset password"}
          </button>
          <p className="text-center text-sm text-slate-500">
            <Link to="/forgot-password" className="font-semibold text-teal-700">
              Request a new link
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        required
        minLength={12}
        type="password"
        autoComplete="new-password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-teal-100 focus:ring-4"
      />
    </label>
  );
}
