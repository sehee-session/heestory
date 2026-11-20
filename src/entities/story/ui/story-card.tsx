import { Link } from 'react-router';
import { PATHS } from '~/shared/constants';
import { formatDate } from '../lib/format-date';
import type { Story } from '../model/types';
import * as styles from './story-card.css';
import { StoryThumbnail } from './story-thumbnail';

export const StoryCard = ({
  id,
  thumbnailUrl,
  title,
  summary,
  createdAt,
}: Omit<Story, 'content'>) => (
  <Link to={PATHS.STORY.DETAIL(id)} className={styles.card}>
    <StoryThumbnail thumbnailUrl={thumbnailUrl} />
    <div className={styles.content}>
      <time className={styles.date} dateTime={createdAt}>
        {formatDate(createdAt)}
      </time>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.summary}>{summary}</p>
    </div>
  </Link>
);
