import { Button } from '@ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/tooltip';
import { ThumbsUp, MessageSquare, Repeat2 } from 'lucide-react';
import usePostDialog from '@src/contextsHooks/usePostDialog';
import { useGetTotalLIkes, useLikePost } from '@src/hooks/usePost';
interface PostActionProps {
  postId: number;
  sharedPostId: number | null;
}

const PostAction: React.FC<PostActionProps> = ({ postId, sharedPostId }) => {
  const { handleDialog } = usePostDialog();
  const totalLikes = useGetTotalLIkes(postId);
  const likePost = useLikePost();

  const handleLikePost = () => {
    likePost.mutate({ postId });
  };

  return (
    <div className='grid grid-cols-12 gap-1 sm:gap-3 w-full'>
      <div className='col-span-4'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleLikePost}
                className='rounded-2xl'
                variant={
                  totalLikes.data?.data.userHasLiked ? 'default' : 'outline'
                }
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
            </TooltipTrigger>
            <TooltipContent>
              <span>Like</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='col-span-4'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className='rounded-2xl' variant={'outline'} fullWidth>
                <MessageSquare size={20} className='text-primary' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Comment</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className='col-span-4'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  // if post is a shared post pass the sharedpost id
                  handleDialog({
                    id: sharedPostId ?? postId,
                    type: 'share',
                  });
                }}
                className='rounded-2xl'
                variant={'outline'}
                fullWidth
              >
                <Repeat2 className='text-primary' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Share</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PostAction;
