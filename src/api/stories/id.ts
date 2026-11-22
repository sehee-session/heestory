import { data } from 'react-router';
import {
  createStoryRepository,
  STORY_ERROR,
  updateStorySchema,
} from '~/entities/story';
import { requireAuth } from '~/shared/auth';
import { COMMON_ERROR } from '~/shared/constants';
import { cloudflareContext } from '~/shared/lib';
import { supabaseContext } from '~/shared/supabase';
import type { Route } from './+types/id';

export const action = async ({ request, context }: Route.ActionArgs) => {
  if (request.method !== 'PATCH') {
    return data(
      { error: COMMON_ERROR.METHOD_NOT_ALLOWED.message },
      {
        status: COMMON_ERROR.METHOD_NOT_ALLOWED.status,
        headers: { Allow: 'PATCH' },
      },
    );
  }

  const user = requireAuth(request, context);

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

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return data(
      { error: STORY_ERROR.INVALID_INPUT.message },
      { status: STORY_ERROR.INVALID_INPUT.status },
    );
  }

  const parsed = updateStorySchema.safeParse(body);

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

  const result = await storyRepository.updateStory(parsed.data);

  if (!result?.id) {
    return data(
      { error: STORY_ERROR.UPDATE_FAILED.message },
      { status: STORY_ERROR.UPDATE_FAILED.status },
    );
  }

  return data({ success: true, storyId: result.id });
};
