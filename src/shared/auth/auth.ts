import { createContext } from 'react-router';

export type AuthUser = {
  id: string;
  email: string | null;
  user_metadata: {
    user_name?: string;
    avatar_url?: string;
    [key: string]: unknown;
  };
};

export const authUserContext = createContext<AuthUser | null>(null);
