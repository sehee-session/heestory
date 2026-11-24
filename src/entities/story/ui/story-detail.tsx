import type { Story } from '~/entities/story';
import { MarkdownViewer } from '~/shared/ui';
import { formatDate } from '../lib/format-date';
import * as styles from './story-detail.css';
import { StoryThumbnail } from './story-thumbnail';

export const StoryDetail = ({
  thumbnailUrl,
  title,
  content,
  createdAt,
}: Omit<Story, 'id' | 'updatedAt' | 'userProfile' | 'userKey'>) => {
  return (
    <div className={styles.root}>
      <StoryThumbnail thumbnailUrl={thumbnailUrl ?? ''} />
      <h1>{title}</h1>
      <time dateTime={createdAt?.toISOString()}>{formatDate(createdAt)}</time>
      <MarkdownViewer content={content ?? ''} />
    </div>
  );
};
