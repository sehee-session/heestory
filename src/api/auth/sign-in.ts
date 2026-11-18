import { redirect } from 'react-router';
import { PATHS } from '~/shared/constants';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/sign-in';

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

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const supabase = context.get(supabaseContext);

  if (!supabase) {
    throw new Response('Supabase client not found', { status: 500 });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const returnTo = getSafeReturnTo(url.searchParams.get('returnTo'));

  if (!code) {
    throw redirect(PATHS.AUTH.SIGN_IN);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    throw redirect(PATHS.AUTH.SIGN_IN);
  }

  throw redirect(returnTo ?? PATHS.HOME);
};
