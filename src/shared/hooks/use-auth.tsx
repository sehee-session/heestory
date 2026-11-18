import { useRouteLoaderData } from 'react-router';
import type { loader } from '~/root';
import { PATHS } from '../constants';

export const useAuth = () => {
  const rootData = useRouteLoaderData<typeof loader>('root');
  const user = rootData?.user ?? null;

  return {
    user,
    isAuthenticated: Boolean(user),
    getTo: (authenticatedPath: string) =>
      user ? authenticatedPath : PATHS.AUTH.SIGN_IN,
  };
};
