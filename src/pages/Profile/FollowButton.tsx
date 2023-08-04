import {
  useIsFollowing,
  useFollowUser,
  useUnFollowUser,
} from '@src/hooks/useFollows';
import { Button } from '@ui/button';
import { Check, UserPlus } from 'lucide-react';
import { useToast } from '@ui/use-toast';
import { useEffect } from 'react';

interface FollowButtonProps {
  id: number;
}

const FollowButton: React.FC<FollowButtonProps> = ({ id }) => {
  const isFollowing = useIsFollowing(id);
  const followUser = useFollowUser();
  const unFollowUser = useUnFollowUser();
  const { toast } = useToast();

  const handleFollowUser = () => {
    followUser.mutate({ followingId: id });
  };

  const handleUnFollowUser = () => {
    unFollowUser.mutate({ followingId: id });
  };

  useEffect(() => {
    if (followUser.isSuccess) {
      toast({
        variant: 'success',
        title: 'Followed succesfully',
      });
    }
    if (followUser.isError) {
      toast({
        variant: 'destructive',
        title: 'An error has occured!',
        description: followUser.error?.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followUser.isSuccess, followUser.isError]);

  useEffect(() => {
    if (unFollowUser.isSuccess) {
      toast({
        variant: 'success',
        title: 'Unfollowed succesfully',
      });
    }
    if (unFollowUser.isError) {
      toast({
        variant: 'destructive',
        title: 'An error has occured!',
        description: followUser.error?.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unFollowUser.isSuccess, unFollowUser.isError]);
  return (
    <>
      {isFollowing.data?.data ? (
        <Button
          onClick={handleUnFollowUser}
          className='mt-4 mr-1 py-5 font-bold min-w-[150px] bg-blue-900 hover:bg-blue-900/90'
          variant={'default'}
          loading={unFollowUser.isLoading}
        >
          <Check className='mr-2' size={20} />
          FOLLOWING
        </Button>
      ) : (
        <Button
          onClick={handleFollowUser}
          className='mt-4 mr-1 py-5 font-bold min-w-[150px]'
          variant={'default'}
          loading={followUser.isLoading}
        >
          <UserPlus className='mr-2' size={20} />
          FOLLOW
        </Button>
      )}
    </>
  );
};

export default FollowButton;
