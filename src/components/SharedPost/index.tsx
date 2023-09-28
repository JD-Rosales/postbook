import { useGetPost } from '@src/hooks/usePost';
import { Card, CardContent } from '@ui/card';
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
                  <div className='flex justify-center'>
                    <div className='min-h-[100px] max-h-[400px]'>
                      <img
                        src={post.data.data.photo}
                        alt='Post'
                        className='max-w-full h-auto max-h-[100%] mx-auto rounded-md'
                      />
                    </div>
                  </div>
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
