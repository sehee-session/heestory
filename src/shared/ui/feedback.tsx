import * as styles from './feedback.css';

type FeedbackProps = {
  thumbnail?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export const Feedback = ({
  thumbnail,
  title,
  description,
  action,
}: FeedbackProps) => {
  return (
    <div className={styles.container}>
      {thumbnail && <div className={styles.thumbnail}>{thumbnail}</div>}

      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};
