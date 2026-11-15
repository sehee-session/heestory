import { redirect } from 'react-router';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return redirect('/?error=missing_code');
  }

  const supabase = context.get(supabaseContext);

  if (!supabase) {
    return redirect('/?error=supabase_not_found');
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirect('/?error=oauth_failed');
  }

  return redirect('/');
};
