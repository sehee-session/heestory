import { useMutation } from '@tanstack/react-query';
import { fetcher } from '~/shared/api';
import { API_PATHS } from '~/shared/constants';
import type { UpdateStorySchema } from '../model/update-story-schema';

export const useEditStory = () =>
  useMutation<{ storyId: string }, Error, UpdateStorySchema>({
    mutationFn: async (input: UpdateStorySchema) => {
      return fetcher.patch<{ storyId: string }>(
        API_PATHS.STORY.DETAIL(input.id),
        input,
      );
    },
  });
