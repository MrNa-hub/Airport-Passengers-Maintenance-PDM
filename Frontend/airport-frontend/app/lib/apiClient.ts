const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:7070';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  // path đã bao gồm /api/... => giữ nguyên
  const url = path.startsWith('http')
    ? path
    : `${BASE}${path.startsWith('/') ? path : '/' + path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export function apiGet<T>(path: string) {
  return request<T>(path, { method: 'GET' });
}

export function apiPost<T = any>(path: string, body: any) {
  return request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function apiPut<T = any>(path: string, body: any) {
  return request<T>(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function apiDelete<T = any>(path: string) {
  return request<T>(path, { method: 'DELETE' });
}
