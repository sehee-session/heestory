import { data, redirect } from 'react-router';
import { API_PATHS } from '~/shared/constants';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/sign-in';

export const action = async ({ request, context }: Route.ActionArgs) => {
  const supabase = context.get(supabaseContext);

  if (!supabase) {
    return data({ error: '인증 정보를 찾을 수 없습니다.' }, { status: 500 });
  }

  const formData = await request.formData();
  const returnTo = formData.get('returnTo');
  const callbackUrl = new URL(API_PATHS.AUTH.CALLBACK, request.url);

  if (typeof returnTo === 'string') {
    callbackUrl.searchParams.set('returnTo', returnTo);
  }

  const redirectTo = callbackUrl.toString();

  const { data: oauthData, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo },
  });

  if (error) {
    return data({ error: error.message }, { status: 500 });
  }

  if (!oauthData.url) {
    return data({ error: 'OAuth URL not found' }, { status: 500 });
  }

  return redirect(oauthData.url);
};
