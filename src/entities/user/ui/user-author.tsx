import { Link } from 'react-router';
import type { StoryAuthor } from '~/entities/story';
import { PATHS } from '~/shared/constants';
import * as styles from './user-author.css';

type UserAuthorProps = Pick<StoryAuthor, 'username' | 'avatarUrl' | 'id'>;

export const UserAuthor = ({ id, username, avatarUrl }: UserAuthorProps) => (
  <Link to={PATHS.USERS.STORY(id)} className={styles.author}>
    {avatarUrl ? (
      <img className={styles.avatar} src={avatarUrl} alt="" />
    ) : (
      <span className={styles.avatarFallback}>
        {username?.charAt(0).toUpperCase()}
      </span>
    )}
    <span className={styles.username}>{username}</span>
  </Link>
);
