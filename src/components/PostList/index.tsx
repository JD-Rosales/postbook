import { FetchNextPageOptions } from '@tanstack/react-query';
import { cn } from '@lib/utils';
import { InfiniteQueryPostResponse } from '@src/hooks/usePost';
import Post from '@components/Post';
import SkeletonLoader from './SkeletonLoader';

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
  return (
    <div className={cn('mt-5', className)}>
      {isLoading ? (
        <SkeletonLoader />
      ) : !data ? (
        <>No Data</>
      ) : data[0].data.length === 0 ? (
        <>No Post</>
      ) : (
        data.map((group, i) => {
          return (
            <div key={i}>
              {group.data.map((post) => {
                return <Post className='mb-5' data={post} key={post.id} />;
              })}
            </div>
          );
        })
      )}

      {!isLoading &&
        (isFetchingNextPage ? (
          <>Fetching more post</>
        ) : !hasNextPage && data && data[0].data.length !== 0 ? (
          <>All post loaded</>
        ) : (
          <button onClick={() => nextPage()}>Next Page</button>
        ))}
    </div>
  );
};

export default Index;
