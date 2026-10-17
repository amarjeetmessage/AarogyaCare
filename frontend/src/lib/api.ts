const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const REQUEST_TIMEOUT_MS = 15_000;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "Patient" | "Doctor";
  emailVerified: boolean;
};
export type ApiResponse = {
  user?: User;
  accessToken?: string;
  message?: string;
  resetToken?: string;
  reply?: string;
};

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export async function api(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse> {
  const controller = new AbortController();
  const timeout = window.setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS,
  );
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type"))
    headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      credentials: "include",
      signal: controller.signal,
    });
    const data: ApiResponse = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.message || `Request failed (${response.status})`);
    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      throw new Error(
        "The request timed out. Please check your connection and try again.",
      );
    if (error instanceof TypeError)
      throw new Error(
        "We could not reach the service. Please try again shortly.",
      );
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
