/* eslint-disable react-hooks/rules-of-hooks */
import { Card, CardFooter } from '@components/ui/card';
import { cn } from '@lib/utils';
import { Suspense, lazy, useRef } from 'react';
import PostLoader from '@components/Loader/PostLoader';
import Header from './Header';
import Content from './Content';
import { useGetPost } from '@src/hooks/usePost';
import usePostState from '@src/contextsHooks/usePostState';

const PostAction = lazy(() => import('./PostAction'));

type PostProps = {
  postId: number;
  hasFooter?: boolean;
  hasMenu?: boolean;
  className?: string;
};

const Index: React.FC<PostProps> = ({
  className,
  postId,
  hasMenu = false,
  hasFooter = true,
}) => {
  const post = useGetPost(postId, true);
  const shareBtnRef = useRef<HTMLButtonElement>(null);
  const { handleDialogOpen } = usePostState();

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
                <Header data={post.data.data} hasMenu={hasMenu} />
                <Content data={post.data.data} />

                {hasFooter && (
                  <CardFooter className='px-3 sm:px-6 pb-2'>
                    <PostAction
                      shareBtnRef={shareBtnRef}
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
