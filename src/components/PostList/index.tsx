import { FetchNextPageOptions } from '@tanstack/react-query';
import { cn } from '@lib/utils';
import { InfiniteQueryPostResponse } from '@src/hooks/usePost';
import PostLoader from '@components/Loader/PostLoader';
import NoData from './NoData';
import { useRef, useEffect, useCallback, lazy, Suspense } from 'react';

const Post = lazy(() => import('@components/Post'));

type PostListProps = {
  className?: string;
  isLoading: boolean;
  data: InfiniteQueryPostResponse[] | undefined;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  nextPage: (options?: FetchNextPageOptions) => void;
};

const Index: React.FC<PostListProps> = ({
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
        threshold: 1.0,
      });

      observer.observe(lastPostRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [handleIntersect]);

  return (
    <div className={cn('pt-5', className)}>
      {isLoading ? (
        <div className='w-full h-full mt-5'>
          <PostLoader />
          <PostLoader />
        </div>
      ) : !data ? (
        <></>
      ) : data[0].data.length === 0 ? (
        <>
          <NoData />
        </>
      ) : (
        <div>
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
        </div>
      )}

      {!isLoading &&
        (isFetchingNextPage ? (
          <div className='relative flex pb-4 items-center px-12'>
            <div className='flex-grow border-t border-gray-200'></div>
            <span className='flex-shrink mx-4 text-gray-400'>Loading</span>
            <div className='flex-grow border-t border-gray-200'></div>
          </div>
        ) : !hasNextPage && data && data[0].data.length !== 0 ? (
          <div className='relative flex pb-4 items-center px-12'>
            <div className='flex-grow border-t border-gray-200'></div>
            <span className='flex-shrink mx-4 text-gray-400'>
              No more posts
            </span>
            <div className='flex-grow border-t border-gray-200'></div>
          </div>
        ) : null)}
    </div>
  );
};

export default Index;
