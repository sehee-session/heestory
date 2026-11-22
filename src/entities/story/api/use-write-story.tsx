import { useMutation } from '@tanstack/react-query';
import { API_PATHS } from '~/shared/constants';
import type { CreateStorySchema } from '../model/create-story-schema';

export const useWriteStory = () =>
  useMutation<{ storyId: string }, Error, CreateStorySchema>({
    mutationFn: async (input: CreateStorySchema) => {
      const response = await fetch(API_PATHS.STORY.BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Failed to create story');
      }

      return response.json();
    },
  });
