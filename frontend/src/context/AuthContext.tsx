import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api, setAccessToken, type User } from "../lib/api";
type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Record<string, string>) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api("/api/auth/refresh", { method: "POST" })
      .then((data) => {
        setAccessToken(data.accessToken || null);
        setUser(data.user || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  const login = async (email: string, password: string) => {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: email.trim(), password }),
    });
    setAccessToken(data.accessToken || null);
    setUser(data.user || null);
  };
  const register = async (data: Record<string, string>) => {
    const result = await api("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setAccessToken(result.accessToken || null);
    setUser(result.user || null);
  };
  const logout = async () => {
    await api("/api/auth/logout", { method: "POST" }).catch(() => {});
    setAccessToken(null);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
