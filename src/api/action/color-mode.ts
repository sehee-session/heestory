import { colorModeCookie } from '~/shared/actions';
import { ACTION_ERROR } from '~/shared/constants';
import type { Route } from './+types/color-mode';

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const mode = formData.get('mode');

  if (mode !== 'dark' && mode !== 'white') {
    return Response.json(
      { success: false, message: ACTION_ERROR.COLOR_MODE.message },
      { status: ACTION_ERROR.COLOR_MODE.status },
    );
  }

  return Response.json(
    { success: true, mode },
    {
      headers: {
        'Set-Cookie': await colorModeCookie.serialize(mode),
      },
    },
  );
};
