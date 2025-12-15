export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8002";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("mailverify-token");
}

interface ApiFetchOptions extends RequestInit {
  auth?: boolean;
}

export async function apiFetch(
  endpoint: string,
  options: ApiFetchOptions = {},
): Promise<Response> {
  const { auth = true, ...fetchOptions } = options;
  const token = auth ? getAuthToken() : null;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(fetchOptions.headers || {}),
    },
  });
  return res;
}
