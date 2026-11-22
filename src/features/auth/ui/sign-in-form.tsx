import React from 'react';
import { useSearchParams } from 'react-router';
import { useSignIn } from '~/entities/auth/api/use-sign-in';
import { Button } from '~/shared/ui';

export const SignInForm = () => {
  const mutation = useSignIn();
  const [searchParams] = useSearchParams();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await mutation.mutateAsync({
      returnTo: searchParams.get('returnTo') ?? '',
    });

    window.location.assign(result.returnUrl);
  };

  return (
    <form onSubmit={onSubmit}>
      <Button type="submit" aria-label="GitHub로 계속하기">
        Continue with GitHub <span>→</span>
      </Button>
    </form>
  );
};
