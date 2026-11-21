import * as styles from './story-thumbnail.css';

export const StoryThumbnail = ({
  thumbnailUrl,
}: {
  thumbnailUrl: string | null;
}) => (
  <img
    className={styles.thumbnail}
    src={thumbnailUrl || '/no-image.png'}
    alt=""
    onError={(event) => {
      event.currentTarget.onerror = null;
      event.currentTarget.src = '/no-image.png';
    }}
  />
);
