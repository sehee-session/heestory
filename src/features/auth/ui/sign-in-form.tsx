import React from 'react';
import { useFetcher, useSearchParams } from 'react-router';
import { PATHS } from '~/shared/constants';
import { toast } from '~/shared/lib/toast';
import { Button } from '~/shared/ui';

type SignInActionData = {
  error?: string;
};

export const SignInForm = () => {
  const fetcher = useFetcher<SignInActionData>();
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data]);

  React.useEffect(() => {
    const error = searchParams.get('error');

    if (!error) return;

    toast.error('로그인에 실패했습니다. 다시 시도해 주세요.');

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('error');

    setSearchParams(nextSearchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  return (
    <fetcher.Form method="post" action={PATHS.API.AUTH.SIGN_IN}>
      <input
        type="hidden"
        name="returnTo"
        value={searchParams.get('returnTo') ?? ''}
      />
      <Button type="submit" aria-label="GitHub로 계속하기">
        Continue with GitHub <span>→</span>
      </Button>
    </fetcher.Form>
  );
};
