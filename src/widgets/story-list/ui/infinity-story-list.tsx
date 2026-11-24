import { StoryCard, useStoryListQuery } from '~/entities/story';
import {
  AsyncState,
  Button,
  Feedback,
  Icon,
  InfiniteScrollTrigger,
} from '~/shared/ui';

type InfiniteStoryListProps = {
  userKey?: string;
};

export const InfiniteStoryList = ({ userKey }: InfiniteStoryListProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isError,
    refetch,
  } = useStoryListQuery({ userKey });

  const stories = data?.pages.flatMap((page) => page.stories) ?? [];

  return (
    <AsyncState
      isPending={isPending}
      isError={isError}
      isEmpty={stories.length === 0}
      error={
        <Feedback
          thumbnail={<Icon icon="error" size={48} />}
          title="스토리를 불러오지 못했습니다."
          description="데이터를 불러오지 못했습니다."
          action={<Button onClick={() => refetch()}>다시 시도</Button>}
        />
      }
      empty={
        <Feedback
          thumbnail={<Icon icon="empty" size={48} />}
          title="아직 스토리가 없습니다."
          description="첫 번째 스토리를 작성해 보세요."
          action={<Button>스토리 작성하기</Button>}
        />
      }
    >
      {stories.map((story) => (
        <article key={story.id}>
          <StoryCard {...story} />
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
