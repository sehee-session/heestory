import { redirect } from 'react-router';
import { PATHS } from '~/shared/constants';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/sign-out';

export const action = async ({ context }: Route.ActionArgs) => {
  const supabase = context.get(supabaseContext);

  if (!supabase) {
    throw new Response('Supabase client not found', { status: 500 });
  }

  const { error } = await supabase.auth.signOut({ scope: 'local' });

  if (error) {
    throw new Response(error.message, { status: 500 });
  }

  return redirect(PATHS.HOME);
};
