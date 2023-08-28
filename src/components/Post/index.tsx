import { lazy, useState } from 'react';
import { Card, CardContent } from '@ui/card';
import { AspectRatio } from '@ui/aspect-ratio';
import PostLoader from '@components/Loader/PostLoader';
import { useGetPost } from '@src/hooks/usePost';
import { cn } from '@lib/utils';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));
const SharedPost = lazy(() => import('@components/SharedPost'));

type IndexProps = {
  postId: number;
  className?: string;
};

const Index: React.FC<IndexProps> = ({ postId, className }) => {
  const post = useGetPost(postId);

  const [isShareBtnClick, setShareBtnClick] = useState(false);

  return (
    <>
      {post.isLoading ? (
        <PostLoader />
      ) : (
        <Card className={cn('mb-2', className)}>
          {!post.data?.data ? (
            'Make a component for post not found'
          ) : (
            <>
              <Header
                data={post.data.data}
                setShareBtnClick={setShareBtnClick}
              />
              <CardContent className='pb-1'>
                {post.data.data.text && (
                  <p className='text-base sm:text-lg break-all mb-2'>
                    {post.data.data.text}
                  </p>
                )}
                {post.data.data.photo && (
                  <AspectRatio ratio={16 / 9}>
                    <img
                      className='rounded-lg w-full h-full object-cover'
                      src={post.data.data.photo}
                      alt='Post Photo'
                    />
                  </AspectRatio>
                )}

                {post.data.data.sharedPostId && (
                  <SharedPost postId={post.data.data.sharedPostId} />
                )}
              </CardContent>
              <Footer
                postId={postId}
                originPostId={post.data.data?.sharedPostId}
                isShareBtnClick={isShareBtnClick}
                setShareBtnClick={setShareBtnClick}
              />
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default Index;
