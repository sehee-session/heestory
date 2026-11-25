import { z } from 'zod';

export const updateUserIntroSchema = z.object({
  intro: z.string().min(1),
});

export type UpdateUserIntroSchema = z.infer<typeof updateUserIntroSchema>;
