import { z } from 'zod';

export const updateStorySchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export type UpdateStorySchema = z.infer<typeof updateStorySchema>;
