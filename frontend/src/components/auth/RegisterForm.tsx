<<<<<<< HEAD
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterSchema = z
  .object({
    FirstName: z.string().min(2, "First name must be at least 2 characters"),
    LastName: z.string().min(2, "Last name must be at least 2 characters"),
    Email: z.email("Enter a valid email address"),
    Password: z.string().min(12, "Password must be atleast 12 characters"),
    ConfirmPassword: z
      .string()
      .min(12, "Password must be atleast 12 characters"),
    role: z.enum(["Patient", "Doctor"]),
  })
  .required();

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterSchema) });
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        {/* First Name */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            {...register("FirstName")}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter first name"
          />
          <p className="text-red-600 text-sm mt-1">
            {errors.FirstName?.message}
          </p>
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            {...register("LastName")}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter last name"
          />
          <p className="text-red-600 text-sm mt-1">
            {errors.LastName?.message}
          </p>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Role</label>
          <select
            {...register("role")}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register("Email")}
            type="email"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your email address"
          />
          <p className="text-red-600 text-sm mt-1">{errors.Email?.message}</p>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register("Password")}
            type="password"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your password"
          />
          <p className="text-red-600 text-sm mt-1">
            {errors.Password?.message}
          </p>
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            {...register("ConfirmPassword")}
            type="password"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your password"
          />
          <p className="text-red-600 text-sm mt-1">
            {errors.ConfirmPassword?.message}
          </p>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
=======
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { AuthShell } from "./LoginForm";
export default function RegisterForm() { const { register } = useAuth(); const navigate = useNavigate(); const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", role: "Patient" }); const [error, setError] = useState(""); const [busy, setBusy] = useState(false); const update = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value })); const submit = async (e: FormEvent) => { e.preventDefault(); setError(""); if (form.password.length < 12) return setError("Password must be at least 12 characters"); if (form.password !== form.confirmPassword) return setError("Passwords do not match"); setBusy(true); try { const { confirmPassword, ...payload } = form; void confirmPassword; await register(payload); navigate("/"); } catch (e) { setError(e instanceof Error ? e.message : "Unable to create account"); } finally { setBusy(false); } }; return <AuthShell title="Create your account" subtitle="Your care journey starts here"><form onSubmit={submit} className="space-y-4"><div className="grid grid-cols-2 gap-3"><Input label="First name" value={form.firstName} onChange={(v) => update("firstName", v)} /><Input label="Last name" value={form.lastName} onChange={(v) => update("lastName", v)} /></div><Input label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} /><label className="block text-sm font-medium text-slate-700">Account type<select value={form.role} onChange={(e) => update("role", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"><option>Patient</option><option>Doctor</option></select></label><Input label="Password" type="password" value={form.password} onChange={(v) => update("password", v)} /><Input label="Confirm password" type="password" value={form.confirmPassword} onChange={(v) => update("confirmPassword", v)} />{error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={busy} className="w-full rounded-xl bg-teal-700 py-3 font-semibold text-white hover:bg-teal-800 disabled:opacity-60">{busy ? "Creating account…" : "Create account"}</button><p className="text-center text-sm text-slate-500">Already registered? <Link className="font-semibold text-teal-700" to="/login">Sign in</Link></p></form></AuthShell>; }
function Input({ label, type = "text", value, onChange }: { label: string; type?: string; value: string; onChange: (value: string) => void }) { return <label className="block text-sm font-medium text-slate-700">{label}<input required type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-teal-100 focus:ring-4" /></label>; }
>>>>>>> e6c3a6ba2f47ec74061ed3ca7217615339a27290
