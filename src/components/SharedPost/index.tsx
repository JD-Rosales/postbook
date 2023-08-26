import { useGetPost } from '@src/hooks/usePost';
import { Card, CardContent } from '@ui/card';
import { AspectRatio } from '@ui/aspect-ratio';
import PostLoader from '@components/Loader/PostLoader';
import Header from './Header';

type IndexProps = {
  postId: number;
};

const Index: React.FC<IndexProps> = ({ postId }) => {
  const post = useGetPost(postId);
  return (
    <>
      {post.isLoading ? (
        <PostLoader />
      ) : (
        <Card className='mt-3'>
          {!post.data?.data ? (
            'Make a component for post not found'
          ) : (
            <>
              <Header data={post.data.data} />
              <CardContent>
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
              </CardContent>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default Index;
