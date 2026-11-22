import { data } from 'react-router';
import { AUTH_ERROR, signInSchema } from '~/entities/auth';
import { API_PATHS, COMMON_ERROR } from '~/shared/constants';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/sign-in';

export const action = async ({ request, context }: Route.ActionArgs) => {
  const supabase = context.get(supabaseContext);

  if (!supabase) {
    return data(
      { error: COMMON_ERROR.CONTEXT_NOT_FOUND.message },
      { status: COMMON_ERROR.CONTEXT_NOT_FOUND.status },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return data(
      { error: AUTH_ERROR.OAUTH_FAILED.message },
      { status: AUTH_ERROR.OAUTH_FAILED.status },
    );
  }

  const parsedBody = signInSchema.safeParse(body);

  if (!parsedBody.success) {
    return data(
      { error: AUTH_ERROR.OAUTH_FAILED.message },
      { status: AUTH_ERROR.OAUTH_FAILED.status },
    );
  }

  const callbackUrl = new URL(API_PATHS.AUTH.CALLBACK, request.url);
  const { returnTo } = parsedBody.data;

  if (returnTo.startsWith('/') && !returnTo.startsWith('//')) {
    callbackUrl.searchParams.set('returnTo', returnTo);
  }

  const { data: oauthData, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: callbackUrl.toString() },
  });

  if (error || !oauthData.url) {
    return data(
      { error: AUTH_ERROR.OAUTH_FAILED.message },
      { status: AUTH_ERROR.OAUTH_FAILED.status },
    );
  }

  return data({ returnUrl: oauthData.url });
};
