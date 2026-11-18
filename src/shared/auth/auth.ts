import { createContext } from 'react-router';

export type AuthUser = {
  id: string;
  email: string | null;
  user_metadata: Record<string, unknown>;
};

export const authUserContext = createContext<AuthUser | null>(null);
