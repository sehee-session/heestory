import type { CookieOptions } from '@supabase/ssr';
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';
import type { MiddlewareFunction } from 'react-router';
import { authUserContext } from '~/shared/auth';
import { supabaseContext } from '~/shared/supabase/context';

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
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
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

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  const userMetadata = claims?.user_metadata;

  context.set(
    authUserContext,
    claims?.sub
      ? {
          id: claims.sub,
          email: typeof claims.email === 'string' ? claims.email : null,
          user_metadata:
            typeof userMetadata === 'object' &&
            userMetadata !== null &&
            !Array.isArray(userMetadata)
              ? (userMetadata as Record<string, unknown>)
              : {},
        }
      : null,
  );
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
