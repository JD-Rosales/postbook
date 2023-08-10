import { useUserFollowers } from '@src/hooks/useFollows';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ui/button';
interface FollowersProps {
  id: number;
}

const Followers: React.FC<FollowersProps> = ({ id }) => {
  const navigate = useNavigate();
  const followers = useUserFollowers(id);

  return (
    <div>
      <div className='flex justify-between items-center my-2'>
        <span className='font-medium'>Followers</span>
        <Button
          className='py-4 mt-0 text-primary hover:text-primary'
          variant={'ghost'}
        >
          See all
        </Button>
      </div>
      <div className='grid grid-cols-12 gap-2'>
        {followers.data?.data ? (
          followers.data.data.map((follower) => {
            return (
              <div
                className='col-span-4 md:col-span-3 cursor-pointer'
                key={follower.id}
                onClick={() => navigate(`/user/${follower.id}`)}
              >
                <div className='relative bg-muted h-[110px] sm:h-[130px] rounded-lg'>
                  {follower.profile?.profilePhoto ? (
                    <img
                      src={follower.profile?.profilePhoto}
                      alt='Profile'
                      className='object-cover w-full h-full rounded-lg'
                    />
                  ) : (
                    <span className='absolute inset-0 flex items-center justify-center text-black'>
                      DP
                    </span>
                  )}
                </div>
                <span className='text-center font-medium block mt-1 truncate'>
                  {follower.profile
                    ? `${follower.profile.firstName} 
                      ${follower.profile?.middleName} 
                      ${follower.profile.lastName}`
                    : `${follower.email}`}
                </span>
              </div>
            );
          })
        ) : (
          <>No Followers</>
        )}
      </div>
    </div>
  );
};

export default Followers;
