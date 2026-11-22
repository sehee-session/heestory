import { z } from 'zod';

export const createStorySchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type CreateStorySchema = z.infer<typeof createStorySchema>;
