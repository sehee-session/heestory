import { useLocation } from 'react-router';
import { PATHS } from '~/shared/constants';
import { Button, Terminal } from '~/shared/ui';
import { Header } from '~/widgets/header';
import * as styles from './sign-in.css';

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
              text: '401: authentication required',
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
            <Button to={PATHS.HOME}>
              Continue with GitHub <span>→</span>
            </Button>
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
