import { Form, useNavigate } from 'react-router';
import { useSignOut } from '~/entities/auth';
import { useAuth } from '~/shared/hooks';
import { Button, Icon } from '~/shared/ui';

export const SignOutForm = () => {
  const { isAuthenticated } = useAuth();
  const mutation = useSignOut();
  const navigate = useNavigate();

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await mutation.mutateAsync();

    navigate(result.returnUrl);
  };

  if (!isAuthenticated) return null;

  return (
    <Form onSubmit={onSubmit}>
      <Button
        variant="icon"
        type="submit"
        aria-label="로그아웃"
        disabled={mutation.isPending}
      >
        <Icon icon="signOut" />
      </Button>
    </Form>
  );
};
