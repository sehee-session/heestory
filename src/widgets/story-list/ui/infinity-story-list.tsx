import { StoryCard, useStoryListQuery } from '~/entities/story';
import { UserAuthor } from '~/entities/user';
import { InfiniteScrollTrigger } from '~/shared/ui';

export const InfiniteStoryList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isError,
  } = useStoryListQuery();

  const stories = data?.pages.flatMap((page) => page.stories) ?? [];

  if (isPending) {
    return <p>스토리를 불러오는 중입니다.</p>;
  }

  if (isError) {
    return <p>스토리를 불러오지 못했습니다.</p>;
  }

  return (
    <>
      {stories.map((story) => (
        <article key={story.id}>
          <StoryCard {...story} />
          {story.userProfile && <UserAuthor {...story.userProfile} />}
        </article>
      ))}
      {hasNextPage && (
        <InfiniteScrollTrigger
          enabled={!isFetching}
          onIntersect={() => {
            if (!isFetchingNextPage) {
              void fetchNextPage();
            }
          }}
        />
      )}
    </>
  );
};
