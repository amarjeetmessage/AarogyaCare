import { Navigate, Route, Routes } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Security from "./pages/Security";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import Chatbot from "./pages/Chatbot";
import Profile from "./pages/Profile";

function Protected({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-slate-500">
        Loading...
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/products" element={<Product />} />
      <Route path="/products/health-guide" element={<Product />} />
      <Route path="/security" element={<Security />} />
      <Route path="/resources" element={<Resources />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />

      <Route
        path="/chat"
        element={
          <Protected>
            <Chatbot />
          </Protected>
        }
      />
      <Route
        path="/profile"
        element={
          <Protected>
            <Profile />
          </Protected>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
