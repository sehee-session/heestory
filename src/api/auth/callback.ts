import { data, redirect } from 'react-router';
import { AUTH_ERROR } from '~/entities/auth';
import { PATHS } from '~/shared/constants';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/callback';

const getSafeReturnTo = (value: string | null) => {
  if (
    !value ||
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

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const supabase = context.get(supabaseContext);

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const returnTo = getSafeReturnTo(url.searchParams.get('returnTo'));

  if (!supabase || !code) {
    return data(
      { error: AUTH_ERROR.OAUTH_FAILED.message },
      { status: AUTH_ERROR.OAUTH_FAILED.status },
    );
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return data(
      { error: AUTH_ERROR.OAUTH_FAILED.message },
      { status: AUTH_ERROR.OAUTH_FAILED.status },
    );
  }

  return redirect(returnTo ?? PATHS.HOME);
};
