import type { RouterContextProvider } from 'react-router';
import { redirect } from 'react-router';
import { authUserContext } from './auth';

export const requireGuest = (
  request: Request,
  context: Readonly<RouterContextProvider>,
) => {
  const user = context.get(authUserContext);

  if (user) {
    const url = new URL(request.url);
    const returnTo = url.searchParams.get('returnTo');

    const destination = returnTo
      ? new URL(returnTo, url.origin)
      : new URL('/', url.origin);

    throw redirect(
      destination.origin === url.origin
        ? `${destination.pathname}${destination.search}${destination.hash}`
        : '/',
    );
  }
};
