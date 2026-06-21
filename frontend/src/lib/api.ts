import { getBackendApiKey } from "@/lib/env";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

async function backendFetch<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      (data as { error?: string }).error || `HTTP ${res.status}`
    );
  }

  return data as T;
}

export async function apiFetch<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<T> {
  return backendFetch<T>(path, options);
}

export async function adminFetch<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<T> {
  return backendFetch<T>(path, {
    ...options,
    headers: {
      ...options?.headers,
      "x-admin-key": getBackendApiKey()
    }
  });
}
