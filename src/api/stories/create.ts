import { data } from 'react-router';
import {
  createStoryRepository,
  createStorySchema,
  STORY_ERROR,
} from '~/entities/story';
import { requireAuth } from '~/shared/auth';
import { AUTH_ERROR } from '~/shared/constants';
import { cloudflareContext } from '~/shared/lib';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/create';

export const action = async ({ request, context }: Route.ActionArgs) => {
  requireAuth(request, context);

  const supabase = context.get(supabaseContext);

  if (!supabase) {
    return data(
      { error: AUTH_ERROR.CONTEXT_NOT_FOUND.message },
      { status: AUTH_ERROR.CONTEXT_NOT_FOUND.status },
    );
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return data(
      { error: AUTH_ERROR.SESSION_NOT_FOUND.message },
      { status: AUTH_ERROR.SESSION_NOT_FOUND.status },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return data(
      { error: STORY_ERROR.INVALID_INPUT.message },
      { status: STORY_ERROR.INVALID_INPUT.status },
    );
  }

  const parsed = createStorySchema.safeParse(body);

  if (!parsed.success) {
    return data(
      { error: STORY_ERROR.INVALID_INPUT.message },
      { status: STORY_ERROR.INVALID_INPUT.status },
    );
  }

  const { env } = context.get(cloudflareContext);

  const storyRepository = createStoryRepository({
    url: env.SUPABASE_URL,
    apiKey: env.SUPABASE_PUBLISHABLE_KEY,
    accessToken: session.access_token,
  });

  const result = await storyRepository.createStory(parsed.data);

  if (!result?.id) {
    return data(
      { error: STORY_ERROR.CREATE_FAILED.message },
      { status: STORY_ERROR.CREATE_FAILED.status },
    );
  }

  return data({ success: true, storyId: result.id });
};
