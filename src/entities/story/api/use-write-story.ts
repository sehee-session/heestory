import { useMutation } from '@tanstack/react-query';
import { fetcher } from '~/shared/api';
import { API_PATHS } from '~/shared/constants';
import type { CreateStorySchema } from '../model/create-story-schema';

export const useWriteStory = () =>
  useMutation<{ storyId: string }, Error, CreateStorySchema>({
    mutationFn: async (input: CreateStorySchema) =>
      fetcher.post<{ storyId: string }>(API_PATHS.STORY.BASE, input),
  });
