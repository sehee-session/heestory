import { LogOutIcon } from 'lucide-react';
import React from 'react';
import { useFetcher } from 'react-router';
import { PATHS } from '~/shared/constants';
import { useAuth } from '~/shared/hooks';
import { toast } from '~/shared/lib/toast';
import { Button } from '~/shared/ui';

export const SignOutForm = () => {
  const { isAuthenticated } = useAuth();
  const fetcher = useFetcher<{ error?: string }>();

  React.useEffect(() => {
    if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data]);

  if (!isAuthenticated) return null;

  return (
    <fetcher.Form method="post" action={PATHS.API.AUTH.SIGN_OUT}>
      <Button
        variant="icon"
        type="submit"
        aria-label="로그아웃"
        disabled={fetcher.state !== 'idle'}
      >
        <LogOutIcon />
      </Button>
    </fetcher.Form>
  );
};
