import type { RouterContextProvider } from 'react-router';
import { redirect } from 'react-router';
import { PATHS } from '~/shared/constants';
import { authUserContext } from './auth';

export const requireAuth = (context: Readonly<RouterContextProvider>) => {
  const user = context.get(authUserContext);

  if (!user) {
    throw redirect(PATHS.AUTH.SIGN_IN);
  }

  return user;
};
