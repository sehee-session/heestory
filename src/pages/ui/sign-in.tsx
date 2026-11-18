import { data, redirect, useLocation } from 'react-router';
import { SignInForm } from '~/features/auth';
import { PATHS } from '~/shared/constants';
import { supabaseContext } from '~/shared/supabase';
import { Button, Terminal } from '~/shared/ui';
import { Header } from '~/widgets/header';
import type { Route } from './+types/sign-in';
import * as styles from './sign-in.css';

export const action = async ({ request, context }: Route.ActionArgs) => {
  const supabase = context.get(supabaseContext);

  if (!supabase) {
    return data({ error: '인증 정보를 찾을 수 없습니다.' }, { status: 500 });
  }

  const formData = await request.formData();
  const returnTo = formData.get('returnTo');
  const callbackUrl = new URL(PATHS.API.AUTH.SIGN_IN, request.url);

  if (typeof returnTo === 'string') {
    callbackUrl.searchParams.set('returnTo', returnTo);
  }

  const redirectTo = callbackUrl.toString();

  const { data: oauthData, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo },
  });

  if (error) {
    return data({ error: error.message }, { status: 500 });
  }

  if (!oauthData.url) {
    return data({ error: 'OAuth URL not found' }, { status: 500 });
  }

  return redirect(oauthData.url);
};

const Page = () => {
  const location = useLocation();

  return (
    <main className={styles.root}>
      <Header text="auth" />
      <div className={styles.content}>
        <Terminal
          lines={[
            {
              text: `request ${location.pathname}${location.search}${location.hash}`,
              type: 'command',
            },
            {
              text: '401: Unauthorized',
              type: 'error',
            },
            {
              text: 'access denied. please authenticate to continue.',
              type: 'command',
            },
            { text: '', type: 'command' },
          ]}
        />

        <section className={styles.message}>
          <span className={styles.code}>401 UNAUTHORIZED</span>
          <h1 className={styles.heading}>Authentication required.</h1>
          <p className={styles.description}>
            You need to sign in before accessing this resource. Authenticate
            with GitHub to continue your journey.
          </p>
          <div className={styles.actions}>
            <SignInForm />
            <Button to={PATHS.HOME} variant="secondary">
              go home
            </Button>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <span>401_UNAUTHORIZED</span>
        <span>IDENTITY REQUIRED. ACCESS PENDING.</span>
      </footer>
    </main>
  );
};

export default Page;
