<<<<<<< HEAD
import React, { useState } from 'react';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
=======
import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
export default function LoginForm() { const { login } = useAuth(); const navigate = useNavigate(); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false); const submit = async (event: FormEvent) => { event.preventDefault(); setError(""); setBusy(true); try { await login(email, password); navigate("/"); } catch (e) { setError(e instanceof Error ? e.message : "Unable to sign in"); } finally { setBusy(false); } }; return <AuthShell title="Welcome back" subtitle="Sign in to continue to AarogyaCare"><form onSubmit={submit} className="space-y-5"><Field label="Email" type="email" value={email} onChange={setEmail} /><Field label="Password" type="password" value={password} onChange={setPassword} /><div className="text-right"><Link className="text-sm text-teal-700 hover:underline" to="/forgot-password">Forgot password?</Link></div>{error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={busy} className="w-full rounded-xl bg-teal-700 py-3 font-semibold text-white hover:bg-teal-800 disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button><p className="text-center text-sm text-slate-500">New to AarogyaCare? <Link className="font-semibold text-teal-700" to="/register">Create an account</Link></p></form></AuthShell>; }
function Field({ label, type, value, onChange }: { label: string; type: string; value: string; onChange: (value: string) => void }) { return <label className="block text-sm font-medium text-slate-700">{label}<input required type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-teal-100 focus:ring-4" /></label>; }
export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) { return <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-12"><div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-teal-100"><div className="mb-8"><div className="mb-6 text-xl font-bold text-teal-700">AarogyaCare</div><h1 className="text-3xl font-bold text-slate-900">{title}</h1><p className="mt-2 text-slate-500">{subtitle}</p></div>{children}</div></main>; }
>>>>>>> e6c3a6ba2f47ec74061ed3ca7217615339a27290
