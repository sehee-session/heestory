import type { RouterContextProvider } from 'react-router';
import { redirect } from 'react-router';
import { PATHS } from '~/shared/constants';
import { authUserContext } from './auth';

export const requireAuth = (
  request: Request,
  context: Readonly<RouterContextProvider>,
) => {
  const user = context.get(authUserContext);

  if (!user) {
    const url = new URL(request.url);
    const returnTo = `${url.pathname}${url.search}`;

    throw redirect(
      `${PATHS.AUTH.SIGN_IN}?returnTo=${encodeURIComponent(returnTo)}`,
    );
  }

  return user;
};
