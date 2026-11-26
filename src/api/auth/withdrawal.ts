import { createClient } from '@supabase/supabase-js';
import { data } from 'react-router';
import { AUTH_ERROR } from '~/entities/auth';
import { COMMON_ERROR } from '~/shared/constants';
import { cloudflareContext } from '~/shared/lib';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/withdrawal';

export const action = async ({ request, context }: Route.ActionArgs) => {
  if (request.method !== 'DELETE') {
    return data(
      { error: COMMON_ERROR.METHOD_NOT_ALLOWED.message },
      {
        status: COMMON_ERROR.METHOD_NOT_ALLOWED.status,
        headers: { Allow: 'DELETE' },
      },
    );
  }

  const supabase = context.get(supabaseContext);

  if (!supabase) {
    return data(
      { error: COMMON_ERROR.CONTEXT_NOT_FOUND.message },
      { status: COMMON_ERROR.CONTEXT_NOT_FOUND.status },
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return data(
      { error: COMMON_ERROR.UNAUTHORIZED.message },
      { status: COMMON_ERROR.UNAUTHORIZED.status },
    );
  }

  const { env } = context.get(cloudflareContext);

  const supabaseAdmin = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SECRET_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    user.id,
  );

  if (deleteError) {
    console.error(deleteError.message, deleteError.code);

    return data(
      { error: AUTH_ERROR.WITHDRAWAL_FAILED.message },
      { status: AUTH_ERROR.WITHDRAWAL_FAILED.status },
    );
  }

  const { error: signOutError } = await supabase.auth.signOut({
    scope: 'local',
  });

  if (signOutError) {
    return data(
      { error: AUTH_ERROR.SIGN_OUT_FAILED.message },
      { status: AUTH_ERROR.SIGN_OUT_FAILED.status },
    );
  }

  return data({});
};
