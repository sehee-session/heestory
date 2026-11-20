import type { Story } from '~/entities/story';
import { MarkdownViewer } from '~/shared/ui';
import * as styles from './story-detail.css';
import { StoryThumbnail } from './story-thumbnail';

export const StoryDetail = ({
  thumbnailUrl,
  title,
  content,
  ...story
}: Story) => {
  return (
    <div className={styles.root}>
      <StoryThumbnail thumbnailUrl={thumbnailUrl} />
      <h1>{title}</h1>
      {/* <time dateTime={createdAt}>{formatDate(createdAt)}</time> */}
      <MarkdownViewer content={content} />
    </div>
  );
};
