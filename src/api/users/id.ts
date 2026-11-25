import { data } from 'react-router';
import {
  createUserRepository,
  updateUserIntroSchema,
  USER_ERROR,
} from '~/entities/user';
import { requireAuth } from '~/shared/auth';
import { COMMON_ERROR } from '~/shared/constants';
import { cloudflareContext } from '~/shared/lib';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/id';

export const action = async ({
  params,
  request,
  context,
}: Route.ActionArgs) => {
  if (request.method !== 'PATCH') {
    return data(
      { error: COMMON_ERROR.METHOD_NOT_ALLOWED.message },
      {
        status: COMMON_ERROR.METHOD_NOT_ALLOWED.status,
        headers: { Allow: 'PATCH' },
      },
    );
  }

  const authUser = requireAuth(request, context);
  const supabase = context.get(supabaseContext);

  if (!supabase) {
    return data(
      { error: COMMON_ERROR.CONTEXT_NOT_FOUND.message },
      { status: COMMON_ERROR.CONTEXT_NOT_FOUND.status },
    );
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return data(
      { error: COMMON_ERROR.SESSION_NOT_FOUND.message },
      { status: COMMON_ERROR.SESSION_NOT_FOUND.status },
    );
  }

  const { env } = context.get(cloudflareContext);

  const userRepository = createUserRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
    accessToken: session.access_token,
  });

  const { id } = params;
  if (!id) {
    return data(
      { error: USER_ERROR.ID_REQUIRED.message },
      { status: USER_ERROR.ID_REQUIRED.status },
    );
  }

  if (authUser.id !== id) {
    return data(
      { error: COMMON_ERROR.FORBIDDEN.message },
      { status: COMMON_ERROR.FORBIDDEN.status },
    );
  }

  const body = await request.json();
  const parsedBody = updateUserIntroSchema.safeParse(body);
  if (!parsedBody.success) {
    return data(
      { error: USER_ERROR.INVALID_INPUT.message },
      { status: USER_ERROR.INVALID_INPUT.status },
    );
  }

  const result = await userRepository.editUserIntro({
    id,
    intro: parsedBody.data.intro,
  });

  return data(result, { status: 200 });
};
