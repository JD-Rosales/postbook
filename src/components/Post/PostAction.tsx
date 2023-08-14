import { Button } from '@ui/button';
import { ThumbsUp } from 'lucide-react';
import SharePostDialog from '@components/SharePostDialog';

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
        <SharePostDialog postId={postId}>
          <Button className='rounded-2xl' variant={'outline'} fullWidth>
            SHARE
          </Button>
        </SharePostDialog>
      </div>
    </div>
  );
};

export default PostAction;
