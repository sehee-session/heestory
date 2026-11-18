import { data, redirect } from 'react-router';
import { PATHS } from '~/shared/constants';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/sign-out';

export const action = async ({ context }: Route.ActionArgs) => {
  const supabase = context.get(supabaseContext);

  if (!supabase) {
    return data({ error: '인증 정보를 찾을 수 없습니다.' }, { status: 500 });
  }

  const { error } = await supabase.auth.signOut({ scope: 'local' });

  if (error) {
    return data({ error: '로그아웃에 실패했습니다.' }, { status: 500 });
  }

  return redirect(PATHS.HOME);
};
