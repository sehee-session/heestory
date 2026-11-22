import { z } from 'zod';

export const updateStorySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
});

export type UpdateStorySchema = z.infer<typeof updateStorySchema>;
