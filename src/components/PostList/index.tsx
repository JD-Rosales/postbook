import { FetchNextPageOptions } from '@tanstack/react-query';
import { cn } from '@lib/utils';
import { InfiniteQueryPostResponse } from '@src/hooks/usePost';
import Post from '@components/Post';
import SkeletonLoader from './SkeletonLoader';
import { useRef, useEffect, useCallback } from 'react';

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
        rootMargin: '0px',
        threshold: 1.0,
      });

      observer.observe(lastPostRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [handleIntersect]);

  return (
    <div className={cn('mt-5', className)}>
      {isLoading ? (
        <SkeletonLoader />
      ) : !data ? (
        <></>
      ) : data[0].data.length === 0 ? (
        <>No Post</>
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
                      <Post data={post} />
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
          <div className='relative flex pb-4 items-center'>
            <div className='flex-grow border-t border-gray-200'></div>
            <span className='flex-shrink mx-4 text-gray-400'>
              Fetching more posts
            </span>
            <div className='flex-grow border-t border-gray-200'></div>
          </div>
        ) : !hasNextPage && data && data[0].data.length !== 0 ? (
          <div className='relative flex pb-4 items-center'>
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
