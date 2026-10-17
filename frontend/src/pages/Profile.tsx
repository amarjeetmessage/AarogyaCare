import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { AuthShell } from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submitProfile = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const result = await api("/api/auth/me", {
        method: "PATCH",
        body: JSON.stringify({ firstName, lastName }),
      });
      if (result.user) updateUser(result.user);
      setMessage(result.message || "Profile updated successfully");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to update profile",
      );
    } finally {
      setBusy(false);
    }
  };

  const submitPassword = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const result = await api("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCurrentPassword("");
      setNewPassword("");
      setMessage(result.message || "Password changed successfully");
      await logout();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to change password",
      );
      setBusy(false);
    }
  };

  return (
    <AuthShell
      title="Manage your account"
      subtitle="Keep your AarogyaCare details and security settings up to date."
    >
      <div className="space-y-8">
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">{user?.email}</p>
          <p className="mt-1">{user?.role} account</p>
        </div>
        <form onSubmit={submitProfile} className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Profile details</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="First name"
              value={firstName}
              onChange={setFirstName}
            />
            <Field label="Last name" value={lastName} onChange={setLastName} />
          </div>
          <button
            disabled={busy}
            className="w-full rounded-xl bg-teal-700 py-3 font-semibold text-white disabled:opacity-60"
          >
            Save profile
          </button>
        </form>
        <form
          onSubmit={submitPassword}
          className="space-y-4 border-t border-slate-200 pt-8"
        >
          <h2 className="text-lg font-bold text-slate-900">Change password</h2>
          <Field
            label="Current password"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={setCurrentPassword}
          />
          <Field
            label="New password"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={setNewPassword}
          />
          <button
            disabled={busy}
            className="w-full rounded-xl border border-teal-700 py-3 font-semibold text-teal-700 disabled:opacity-60"
          >
            Change password
          </button>
        </form>
        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {message && (
          <p className="rounded-lg bg-teal-50 p-3 text-sm text-teal-800">
            {message}
          </p>
        )}
        <Link
          to="/dashboard"
          className="block text-center text-sm font-semibold text-teal-700 hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
    </AuthShell>
  );
}

function Field({
  label,
  type = "text",
  autoComplete,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        required
        minLength={type === "password" ? 12 : undefined}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-teal-100 focus:ring-4"
      />
    </label>
  );
}
