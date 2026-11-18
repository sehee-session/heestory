import React from 'react';
import { Form, useActionData, useSearchParams } from 'react-router';
import { PATHS } from '~/shared/constants';
import { toast } from '~/shared/lib/toast';
import { Button } from '~/shared/ui';

export const SignInForm = () => {
  const actionData = useActionData<{ error?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  React.useEffect(() => {
    const error = searchParams.get('error');

    if (!error) return;

    toast.error('로그인에 실패했습니다. 다시 시도해 주세요.');

    searchParams.delete('error');
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  return (
    <Form method="post" action={PATHS.AUTH.SIGN_IN}>
      <input
        type="hidden"
        name="returnTo"
        value={searchParams.get('returnTo') ?? ''}
      />
      <Button type="submit" aria-label="GitHub로 계속하기">
        Continue with GitHub <span>→</span>
      </Button>
    </Form>
  );
};
