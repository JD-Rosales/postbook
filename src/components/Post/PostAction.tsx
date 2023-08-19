import { Button } from '@ui/button';
import { ThumbsUp } from 'lucide-react';
import { useGetTotalLIkes, useLikePost } from '@src/hooks/usePost';
import { lazy } from 'react';

const PostShareDialog = lazy(() => import('@components/PostShareDialog'));
interface PostActionProps {
  postId: number;
  sharedPostId?: number;
  shareBtnRef?: React.RefObject<HTMLButtonElement>;
}

const PostAction: React.FC<PostActionProps> = ({
  postId,
  sharedPostId,
  shareBtnRef,
}) => {
  const totalLikes = useGetTotalLIkes(postId);
  const likePost = useLikePost();

  const handleLikePost = () => {
    likePost.mutate({ postId });
  };

  return (
    <div className='grid grid-cols-12 gap-1 sm:gap-3 w-full'>
      <div className='col-span-4'>
        <Button
          onClick={handleLikePost}
          className='rounded-2xl'
          variant={totalLikes.data?.data.userHasLiked ? 'default' : 'outline'}
          fullWidth
          disabled={likePost.isLoading}
        >
          <ThumbsUp
            size={20}
            className={`${
              totalLikes.data?.data.userHasLiked
                ? 'text-destructive-foreground'
                : 'text-primary'
            }`}
          />

          {totalLikes?.data?.data?.likesCount ? (
            <span
              className={`${
                totalLikes.data?.data.userHasLiked
                  ? 'text-destructive-foreground'
                  : 'text-primary'
              } ml-3 text-lg font-semibold`}
            >
              {totalLikes?.data?.data?.likesCount}
            </span>
          ) : (
            ''
          )}
        </Button>
      </div>
      <div className='col-span-4'>
        <Button className='rounded-2xl' variant={'outline'} fullWidth>
          COMMENT
        </Button>
      </div>

      <div className='col-span-4'>
        <PostShareDialog postId={postId} sharedPostId={sharedPostId}>
          <Button
            ref={shareBtnRef}
            className='rounded-2xl'
            variant={'outline'}
            fullWidth
          >
            SHARE
          </Button>
        </PostShareDialog>
      </div>
    </div>
  );
};

export default PostAction;
