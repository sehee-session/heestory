import type { StoryAuthor } from '~/entities/story';
import * as styles from './user-info.css';

type UserInfoProps = Partial<Pick<StoryAuthor, 'username' | 'avatarUrl'>>;

export const UserInfo = ({ username, avatarUrl }: UserInfoProps) => (
  <section className={styles.root}>
    <img className={styles.avatar} src={avatarUrl ?? ''} alt="" />
    <div className={styles.content}>
      <h2 className={styles.username}>{username}</h2>
    </div>
  </section>
);
