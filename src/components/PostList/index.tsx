import { useEffect, Suspense } from 'react';
import { cn } from '@src/lib/utils';
import { FetchNextPageOptions } from '@tanstack/react-query';
import { InfiniteQueryPostResponse } from '@src/hooks/usePost';
import PostLoader from '@components/Loader/PostLoader';
import Post from '@src/components/Post';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import NoPost from './NoPost';

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
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      nextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className={cn('pt-4', className)}>
      {isLoading ? (
        <div className='w-full h-full mt-5'>
          <PostLoader />
          <PostLoader />
        </div>
      ) : !data || data[0].data.length === 0 ? (
        <NoPost />
      ) : (
        <>
          {data.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((post) => {
                return (
                  <React.Fragment key={post.id}>
                    <Suspense fallback={<PostLoader />}>
                      <Post postId={post.id} />
                    </Suspense>
                  </React.Fragment>
                );
              })}

              <div ref={ref}></div>
            </React.Fragment>
          ))}
        </>
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
