import { z } from 'zod';

export const updateStorySchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  content: z.string().min(1),
  userKey: z.uuid(),
});

export type UpdateStorySchema = z.infer<typeof updateStorySchema>;
