import { Form } from 'react-router';
import { Button } from '~/shared/ui/button';

export const SignInForm = () => (
  <Form method="post">
    <input
      type="hidden"
      name="returnTo"
      value={new URLSearchParams(location.search).get('returnTo') ?? ''}
    />
    <Button type="submit" aria-label="GitHub로 계속하기">
      Continue with GitHub <span>→</span>
    </Button>
  </Form>
);
