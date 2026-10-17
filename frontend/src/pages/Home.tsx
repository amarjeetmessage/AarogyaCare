<<<<<<< HEAD
export default function Home(){

    return(
        <>Home Page</>
    )
}
=======
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
export default function Home() {
  const { user, logout } = useAuth();
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between border-b bg-white px-6 py-4">
        <span className="text-xl font-bold text-teal-700">AarogyaCare</span>
        <button
          onClick={logout}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          Sign out
        </button>
      </nav>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-semibold text-teal-700">{user?.role} portal</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Hello, {user?.firstName}.</h1>
        <p className="mt-4 max-w-xl text-slate-600">Your secure AarogyaCare dashboard is ready.</p>
        <Link
          to="/chat"
          className="mt-8 inline-flex rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800">
          Talk to Health Guide
        </Link>
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Account details</h2>
          <p className="mt-3 text-slate-600">{user?.email}</p>
        </div>
      </section>
    </main>
  );
}
>>>>>>> e6c3a6ba2f47ec74061ed3ca7217615339a27290
