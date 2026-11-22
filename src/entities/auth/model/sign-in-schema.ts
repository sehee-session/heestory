import { z } from 'zod';

export const signInSchema = z.object({ returnTo: z.string() });

export type SignInSchema = z.infer<typeof signInSchema>;
