import type { CookieOptions } from '@supabase/ssr';
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';
import type { MiddlewareFunction } from 'react-router';
import { supabaseContext } from '~/shared/supabase';

type PendingCookie = {
  name: string;
  value: string;
  options: CookieOptions;
};

export const supabaseMiddleware: MiddlewareFunction<Response> = async (
  { request, context },
  next,
) => {
  const pendingCookies: PendingCookie[] = [];
  const pendingHeaders: Record<string, string> = {};

  const supabase = createServerClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '');
        },
        setAll(cookiesToSet, headers) {
          pendingCookies.push(...cookiesToSet);
          Object.assign(pendingHeaders, headers);
        },
      },
    },
  );

  await supabase.auth.getClaims();

  context.set(supabaseContext, supabase);

  const response = await next();

  for (const { name, value, options } of pendingCookies) {
    response.headers.append(
      'Set-Cookie',
      serializeCookieHeader(name, value, options),
    );
  }

  for (const [key, value] of Object.entries(pendingHeaders)) {
    response.headers.set(key, value);
  }

  return response;
};
