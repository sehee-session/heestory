import { redirect } from 'react-router';
import { PATHS } from '~/shared/constants';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/callback';

const getSafeReturnTo = (value: string | null) => {
  if (!value) return null;

  if (
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\') ||
    [...value].some(
      (char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127,
    )
  ) {
    return null;
  }

  return value;
};

const redirectToSignIn = (
  request: Request,
  error: string,
  returnTo: string | null,
) => {
  const url = new URL(PATHS.AUTH.SIGN_IN, request.url);

  url.searchParams.set('error', error);

  if (returnTo) {
    url.searchParams.set('returnTo', returnTo);
  }

  return redirect(url.toString());
};

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const supabase = context.get(supabaseContext);

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const returnTo = getSafeReturnTo(url.searchParams.get('returnTo'));

  if (!supabase) {
    return redirectToSignIn(request, 'oauth_failed', returnTo);
  }

  if (!code) {
    return redirectToSignIn(request, 'oauth_failed', returnTo);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirectToSignIn(request, 'oauth_failed', returnTo);
  }

  return redirect(returnTo ?? PATHS.HOME);
};
