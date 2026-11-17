import { redirect } from 'react-router';
import { PATHS } from '~/shared/constants';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/index';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const supabase = context.get(supabaseContext);

  if (!supabase) {
    throw new Response('Supabase client not found', { status: 500 });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    throw redirect(PATHS.HOME);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error('OAuth callback error:', error.message);
    throw redirect('/sign-in');
  }

  return redirect(PATHS.HOME);
};
