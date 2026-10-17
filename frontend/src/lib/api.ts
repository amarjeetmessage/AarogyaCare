const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export type User = { id: string; firstName: string; lastName: string; email: string; role: "Patient" | "Doctor"; emailVerified: boolean };
type ApiResponse = { user?: User; accessToken?: string; message?: string; resetToken?: string; reply?: string };
let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => { accessToken = token; };
export const api = async (path: string, options: RequestInit = {}): Promise<ApiResponse> => { const headers = new Headers(options.headers); if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json"); if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`); const response = await fetch(`${API_URL}${path}`, { ...options, headers, credentials: "include" }); const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.message || "Something went wrong"); return data; };
