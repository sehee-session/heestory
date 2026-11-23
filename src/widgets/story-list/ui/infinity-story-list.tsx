import { StoryCard, useStoryListQuery } from '~/entities/story';
import { UserAuthor } from '~/entities/user';
import { AsyncState, InfiniteScrollTrigger } from '~/shared/ui';

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

  return (
    <AsyncState
      isPending={isPending}
      isError={isError}
      isEmpty={stories.length === 0}
      error={<p>스토리를 불러오지 못했습니다.</p>}
      empty={<p>스토리가 없습니다.</p>}
    >
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
    </AsyncState>
  );
};
