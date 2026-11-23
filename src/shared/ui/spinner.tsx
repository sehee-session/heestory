import * as styles from './spinner.css';

type SpinnerProps = {
  size?: keyof typeof styles.spinner;
};

export const Spinner = ({ size = 'lg' }: SpinnerProps) => {
  return (
    <span className={styles.spinner[size]} role="status" aria-label="Loading" />
  );
};
