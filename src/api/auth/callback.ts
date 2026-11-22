import { redirect } from 'react-router';
import { createUserRepository } from '~/entities/user';
import { PATHS } from '~/shared/constants';
import { cloudflareContext } from '~/shared/lib/cloudflare';
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
    return redirect(PATHS.AUTH.SIGN_IN);
  }

  const { data: authData, error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error || !authData.user || !authData.session) {
    return redirect(PATHS.AUTH.SIGN_IN);
  }

  const { env } = context.get(cloudflareContext);

  const userRepository = createUserRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
    accessToken: authData.session.access_token,
  });

  await userRepository.syncUserProfile({
    username: authData.user.user_metadata.user_name ?? null,
    avatarUrl: authData.user.user_metadata.avatar_url ?? null,
  });

  return redirect(returnTo ?? PATHS.HOME);
};
