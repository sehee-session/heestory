import type { StoryAuthor } from '~/entities/story';
import * as styles from './user-info.css';

type UserInfoProps = Partial<
  Pick<StoryAuthor, 'username' | 'avatarUrl' | 'intro'>
>;

export const UserInfo = ({ username, avatarUrl, intro }: UserInfoProps) => (
  <section className={styles.root}>
    <img className={styles.avatar} src={avatarUrl ?? ''} alt="" />
    <div className={styles.content}>
      <h2>{username} </h2>
      <p className={styles.intro}>{intro || '자기소개가 없습니다.'}</p>
    </div>
  </section>
);
