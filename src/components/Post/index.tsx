/* eslint-disable react-hooks/rules-of-hooks */
import { Card, CardFooter } from '@components/ui/card';
import { cn } from '@lib/utils';
import { Suspense, lazy } from 'react';
import PostLoader from '@components/Loader/PostLoader';
import { useGetPost } from '@src/hooks/usePost';

const Header = lazy(() => import('./Header'));
const Content = lazy(() => import('./Content'));
const PostAction = lazy(() => import('./PostAction'));

type PostProps = {
  postId: number;
  hasFooter?: boolean;
  className?: string;
  isEditable?: boolean;
};

const Index: React.FC<PostProps> = ({
  className,
  postId,
  hasFooter = true,
  isEditable = false,
}) => {
  const post = useGetPost(postId);

  return (
    <Suspense fallback={<PostLoader />}>
      {post.isLoading ? (
        ''
      ) : (
        <>
          {!post.data?.data ? (
            <>Make a component for post not found</>
          ) : (
            <>
              <Card className={cn('mb-2', className)}>
                <Header data={post.data.data} />
                <Content data={post.data.data} isEditable={isEditable} />

                {hasFooter && (
                  <CardFooter className='px-3 sm:px-6 pb-2'>
                    <PostAction
                      postId={post.data.data.id}
                      sharedPostId={post.data.data.sharedPostId}
                    />
                  </CardFooter>
                )}
              </Card>
            </>
          )}
        </>
      )}
    </Suspense>
  );
};

export default Index;
