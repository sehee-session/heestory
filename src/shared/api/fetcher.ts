type ApiErrorResponse = {
  error?: string;
};

const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);

  if (response.status === 204) {
    return undefined as T;
  }

  const result: unknown = await response.json();

  if (!response.ok) {
    const errorMessage =
      typeof result === 'object' &&
      result !== null &&
      'error' in result &&
      typeof (result as ApiErrorResponse).error === 'string'
        ? (result as ApiErrorResponse).error
        : 'Request failed';

    throw new Error(errorMessage);
  }

  return result as T;
};

const requestWithBody = async <T>(
  method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  url: string,
  body?: unknown,
  init?: RequestInit,
): Promise<T> => {
  const headers = new Headers(init?.headers);

  if (body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  return request<T>(url, {
    ...init,
    method,
    headers,
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });
};

export const fetcher = {
  get: <T>(url: string, init?: RequestInit) =>
    request<T>(url, { ...init, method: 'GET' }),

  post: <T>(url: string, body?: unknown, init?: RequestInit) =>
    requestWithBody<T>('POST', url, body, init),

  patch: <T>(url: string, body?: unknown, init?: RequestInit) =>
    requestWithBody<T>('PATCH', url, body, init),

  put: <T>(url: string, body?: unknown, init?: RequestInit) =>
    requestWithBody<T>('PUT', url, body, init),

  delete: <T>(url: string, body?: unknown, init?: RequestInit) =>
    requestWithBody<T>('DELETE', url, body, init),
};
