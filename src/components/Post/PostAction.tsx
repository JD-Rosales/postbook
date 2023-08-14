import { Button } from '@ui/button';
import { ThumbsUp } from 'lucide-react';
import PostShareDialog from '@components/PostShareDialog';

interface PostActionProps {
  postId: number;
}

const PostAction: React.FC<PostActionProps> = ({ postId }) => {
  return (
    <div className='grid grid-cols-12 gap-1 sm:gap-3 w-full'>
      <div className='col-span-4'>
        <Button className='rounded-2xl' variant={'outline'} fullWidth>
          <ThumbsUp size={20} />
          <span className='ml-3 text-lg font-semibold'>5</span>
        </Button>
      </div>
      <div className='col-span-4'>
        <Button className='rounded-2xl' variant={'outline'} fullWidth>
          COMMENT
        </Button>
      </div>

      <div className='col-span-4'>
        <PostShareDialog postId={postId}>
          <Button className='rounded-2xl' variant={'outline'} fullWidth>
            SHARE
          </Button>
        </PostShareDialog>
      </div>
    </div>
  );
};

export default PostAction;
