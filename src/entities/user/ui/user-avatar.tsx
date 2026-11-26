import { Link } from 'react-router';
import type { StoryAuthor } from '~/entities/story';
import { PATHS } from '~/shared/constants';
import * as styles from './user-avatar.css';

type UserAuthorProps = Pick<StoryAuthor, 'username' | 'avatarUrl'>;

export const UserAvatar = ({ username, avatarUrl }: UserAuthorProps) => (
  <Link to={PATHS.USERS.DETAIL(username)} className={styles.author}>
    {avatarUrl ? (
      <img
        className={styles.avatar}
        src={avatarUrl}
        alt={`${username}'s avatar`}
      />
    ) : (
      <span className={styles.avatarFallback}>
        {username?.charAt(0).toUpperCase()}
      </span>
    )}
  </Link>
);
