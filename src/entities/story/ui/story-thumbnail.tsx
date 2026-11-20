import * as styles from './story-thumbnail.css';

export const StoryThumbnail = ({
  thumbnailUrl,
}: {
  thumbnailUrl: string | null;
}) => (
  <div className={styles.thumbnail}>
    {thumbnailUrl ? (
      <img className={styles.thumbnailImage} src={thumbnailUrl} alt="" />
    ) : (
      <span>~/story</span>
    )}
  </div>
);
