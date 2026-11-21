import { z } from 'zod';

export const createStorySchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreateStorySchema = z.infer<typeof createStorySchema>;
