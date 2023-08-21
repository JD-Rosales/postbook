/* eslint-disable react-hooks/rules-of-hooks */
import { Card, CardFooter } from '@components/ui/card';
import { cn } from '@lib/utils';
import { Suspense, lazy, useRef } from 'react';
import PostLoader from '@components/Loader/PostLoader';
import Header from './Header';
import Content from './Content';

const PostUpdateDialog = lazy(() => import('@components/PostUpdateDialog'));
const PostAction = lazy(() => import('./PostAction'));

type PostProps = {
  data: PostAuthor;
  postEditable?: boolean;
  hasFooter?: boolean;
  hasMenu?: boolean;
  className?: string;
};

const Index: React.FC<PostProps> = ({
  className,
  data,
  postEditable = false,
  hasMenu = false,
  hasFooter = true,
}) => {
  const shareBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <Suspense fallback={<PostLoader />}>
      <Card className={cn('mb-2', className)}>
        <Header data={data} hasMenu={hasMenu} />
        <Content data={data} postEditable={postEditable} />

        {hasFooter && (
          <CardFooter className='px-3 sm:px-6 pb-2'>
            <PostAction
              shareBtnRef={shareBtnRef}
              postId={data.id}
              sharedPostId={data.sharedPostId}
            />
          </CardFooter>
        )}
      </Card>
      <PostUpdateDialog postId={data.id} />
    </Suspense>
  );
};

export default Index;
