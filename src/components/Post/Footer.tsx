import { ThumbsUp, MessageSquare, Repeat2 } from 'lucide-react';
import { CardFooter } from '@ui/card';
import { Button } from '@ui/button';
import { useGetTotalLIkes, useLikePost } from '@src/hooks/usePost';
import { useEffect } from 'react';

type FooterProps = {
  postId: number;
};

const Footer: React.FC<FooterProps> = ({ postId }) => {
  const totalLikes = useGetTotalLIkes(postId);
  const likePost = useLikePost();

  const handleLikePost = () => {
    likePost.mutate({ postId });
  };

  useEffect(() => {
    if (likePost.isSuccess) {
      likePost.reset();
    }
  }, [likePost]);

  return (
    <CardFooter className='pb-4'>
      <div className='grid grid-cols-12 gap-1 sm:gap-3 w-full'>
        <div className='col-span-4'>
          <Button
            onClick={handleLikePost}
            className={`rounded-2xl px-3 sm:px-4 ${
              totalLikes.data?.data.userHasLiked
                ? 'text-white'
                : 'text-blue-700'
            }`}
            variant={`${
              totalLikes.data?.data.userHasLiked ? 'default' : 'outline'
            }`}
            fullWidth
          >
            <ThumbsUp size={20} />
            <span
              className={`ml-2 truncate ${
                !totalLikes.data?.data.userHasLiked && 'text-gray-600'
              }`}
            >
              {totalLikes.data?.data.likesCount === 0
                ? 'Like'
                : totalLikes.data?.data.likesCount}
            </span>
          </Button>
        </div>

        <div className='col-span-4'>
          <Button
            className='rounded-2xl px-3 sm:px-4'
            variant={'outline'}
            fullWidth
          >
            <MessageSquare size={20} className='text-blue-700' />
            <span className='ml-2 text-gray-600 truncate'>Comment</span>
          </Button>
        </div>

        <div className='col-span-4'>
          <Button
            className='rounded-2xl px-3 sm:px-4'
            variant={'outline'}
            fullWidth
          >
            <Repeat2 size={20} className='text-blue-700' />
            <span className='ml-2 text-gray-600 truncate'>Share</span>
          </Button>
        </div>
      </div>
    </CardFooter>
  );
};

export default Footer;
