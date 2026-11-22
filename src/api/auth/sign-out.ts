import { data } from 'react-router';
import { AUTH_ERROR } from '~/entities/auth';
import { COMMON_ERROR, PATHS } from '~/shared/constants';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/sign-out';

export const action = async ({ context }: Route.ActionArgs) => {
  const supabase = context.get(supabaseContext);

  if (!supabase) {
    return data(
      { error: COMMON_ERROR.CONTEXT_NOT_FOUND.message },
      { status: COMMON_ERROR.CONTEXT_NOT_FOUND.status },
    );
  }

  const { error } = await supabase.auth.signOut({ scope: 'local' });

  if (error) {
    return data(
      { error: AUTH_ERROR.SIGN_OUT_FAILED.message },
      { status: AUTH_ERROR.SIGN_OUT_FAILED.status },
    );
  }

  return data({ returnUrl: PATHS.HOME });
};
