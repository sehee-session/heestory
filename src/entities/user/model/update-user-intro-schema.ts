import { z } from 'zod';

export const updateUserIntroSchema = z.object({
  intro: z.string(),
});

export type UpdateUserIntroSchema = z.infer<typeof updateUserIntroSchema>;
