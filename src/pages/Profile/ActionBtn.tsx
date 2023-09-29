import { useEffect } from 'react';
import { Button } from '@ui/button';
import { Skeleton } from '@ui/skeleton';
import {
  useUserFollowers,
  useIsFollowing,
  useFollowUser,
  useUnFollowUser,
} from '@src/hooks/useFollows';
import { parseJwtId } from '@lib/utils';
import { UserPlus2, UserCheck2, Settings } from 'lucide-react';
import EditProfileDialog from './EditProfile';

type ActionBtnProps = {
  id: string;
};

const ActionBtn: React.FC<ActionBtnProps> = ({ id }) => {
  const userFollowers = useUserFollowers(id);
  const isFollowing = useIsFollowing(id);
  const followUser = useFollowUser();
  const unFollowUser = useUnFollowUser();

  useEffect(() => {
    if (followUser.isSuccess || unFollowUser.isSuccess) {
      followUser.reset();
      unFollowUser.reset();
    }
  }, [followUser, unFollowUser]);

  return (
    <>
      <div className='mt-1 flex flex-col items-center sm:items-start justify-center sm:justify-normal'>
        {userFollowers.isLoading ? (
          <Skeleton className='w-[140px] h-7' />
        ) : (
          <span className='text-lg font-medium text-gray-600 italic'>{`${
            userFollowers.data?.data.length
          } ${
            userFollowers.data?.data.length &&
            userFollowers.data?.data.length > 1
              ? 'followers'
              : 'follower'
          }`}</span>
        )}

        {parseJwtId()?.toString() === id ? (
          <EditProfileDialog>
            <Button
              disabled={unFollowUser.isLoading || followUser.isLoading}
              variant={'default'}
              className='w-[190px]'
            >
              <Settings className='mr-2' /> Edit Profile
            </Button>
          </EditProfileDialog>
        ) : isFollowing.data?.data ? (
          <Button
            onClick={() => {
              unFollowUser.mutate({ followingId: id });
            }}
            disabled={unFollowUser.isLoading || followUser.isLoading}
            variant={'default'}
            className='w-[190px]'
          >
            <UserCheck2 className='mr-2' /> Following
          </Button>
        ) : (
          <Button
            onClick={() => {
              followUser.mutate({ followingId: id });
            }}
            disabled={unFollowUser.isLoading || followUser.isLoading}
            variant={'outline'}
            className='w-[190px]'
          >
            <UserPlus2 className='mr-2' /> Follow
          </Button>
        )}
      </div>
    </>
  );
};

export default ActionBtn;
