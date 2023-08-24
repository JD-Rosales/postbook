import { useCallback, useEffect, useRef, Suspense } from 'react';
import { cn } from '@src/lib/utils';
import { FetchNextPageOptions } from '@tanstack/react-query';
import { InfiniteQueryPostResponse } from '@src/hooks/usePost';
import PostLoader from '@components/Loader/PostLoader';
import Post from '@src/components/Post';

type IndexProps = {
  className?: string;
  isLoading: boolean;
  data: InfiniteQueryPostResponse[] | undefined;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  nextPage: (options?: FetchNextPageOptions) => void;
};

const Index: React.FC<IndexProps> = ({
  className,
  isLoading,
  data,
  hasNextPage,
  isFetchingNextPage,
  nextPage,
}) => {
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      const lastPostEntry = entries[0];
      if (lastPostEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        nextPage();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        observer.unobserve(lastPostRef.current!); // Stop observing after triggering nextPage()
      }
    },
    [hasNextPage, isFetchingNextPage, nextPage]
  );

  useEffect(() => {
    if (lastPostRef.current) {
      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: '20px',
        threshold: 1,
      });

      observer.observe(lastPostRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [handleIntersect]);
  return (
    <div className={cn('pt-4', className)}>
      {isLoading ? (
        <div className='w-full h-full mt-5'>
          <PostLoader />
          <PostLoader />
        </div>
      ) : !data ? (
        ''
      ) : data[0].data.length === 0 ? (
        ''
      ) : (
        <>
          {data.map((group, i) => {
            return (
              <div key={i}>
                {group.data.map((post, i) => {
                  return (
                    <div
                      className='mb-5'
                      key={post.id}
                      ref={i === group.data.length - 1 ? lastPostRef : null}
                    >
                      <Suspense fallback={<PostLoader />}>
                        <Post postId={post.id} />
                      </Suspense>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Index;
