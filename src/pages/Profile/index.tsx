/* eslint-disable react-hooks/rules-of-hooks */
import ContainerXl from '@components/ContainerXl';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Skeleton } from '@ui/skeleton';
import { Button } from '@ui/button';
import { useGetProfile } from '@src/hooks/useProfile';
import { useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { parseJwtId } from '@lib/utils';
import PageNotFound from '@pages/NotFound';
import UpdateDialog from './UpdateDialog';
import FollowButton from './FollowButton';
import Followers from './Followers';
import { useUserPosts } from '@src/hooks/usePost';
import PostList from '@components/PostList';

const Index = () => {
  const { id } = useParams();
  const userProfile = useGetProfile(id);
  const userPosts = useUserPosts(id);

  if (userProfile.isError) {
    return <PageNotFound />;
  }

  return (
    <ContainerXl>
      <div className='pb-5'>
        <div className='relative bg-slate-400 h-52 rounded-b-lg mb-[90px]'>
          {userProfile.data?.data?.profile?.coverPhoto ? (
            <img
              className='object-cover w-full h-full rounded-b-lg'
              src={userProfile.data?.data?.profile.coverPhoto}
              alt='Profile Cover Photo'
            />
          ) : (
            <span className='absolute inset-0 flex items-center justify-center text-white'>
              COVER PHOTO
            </span>
          )}

          <div className='absolute -bottom-20 right-0 left-0'>
            <div className='text-black relative w-44 h-44 mx-auto p-1 rounded-full bg-slate-300'>
              {userProfile.isLoading ? (
                <Skeleton className='w-full h-full rounded-full' />
              ) : (
                <Avatar className='h-full w-full'>
                  <AvatarImage
                    src={userProfile.data?.data?.profile?.profilePhoto}
                  />
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
              )}

              {/* <button className='bg-gray-200 hover:bg-slate-300 p-2 rounded-full absolute bottom-5 right-1'>
                <Camera size={20} />
              </button> */}
            </div>
          </div>

          {/* <button className='bg-gray-200 hover:bg-slate-300 p-2 rounded absolute bottom-3 right-3'>
            <Camera size={20} />
          </button> */}
        </div>

        {userProfile.isLoading ? (
          <Skeleton className='w-[300px] h-[30px] mx-auto' />
        ) : (
          <span className='text-center text-3xl font-medium block px-4 break-all'>
            {userProfile.isSuccess &&
              (userProfile.data?.data?.profile
                ? `${userProfile.data?.data?.profile.firstName} 
          ${userProfile.data?.data?.profile?.middleName} 
          ${userProfile.data?.data?.profile.lastName}`
                : `${userProfile.data?.data?.email}`)}
          </span>
        )}

        {userProfile.isSuccess &&
          (parseJwtId().toString() === id ? (
            <div className=' flex justify-center'>
              <UpdateDialog queryData={userProfile.data?.data.profile}>
                <Button
                  className='mt-4 ml-1 py-5 font-bold'
                  variant={'default'}
                >
                  <Pencil className='mr-2' size={20} />
                  EDIT PROFILE
                </Button>
              </UpdateDialog>
            </div>
          ) : (
            <div className=' flex justify-center'>
              <FollowButton id={userProfile.data.data.id} />
            </div>
          ))}

        {userProfile.isLoading ? (
          <>Loading</>
        ) : (
          <Followers id={userProfile.data.data.id} />
        )}
      </div>

      <span className='font-medium block mt-6'>Posts</span>
      <PostList
        className='mt-2'
        isLoading={userPosts.isLoading}
        data={userPosts.data?.pages}
        hasNextPage={userPosts.hasNextPage}
        isFetchingNextPage={userPosts.isFetchingNextPage}
        nextPage={userPosts.fetchNextPage}
      />
    </ContainerXl>
  );
};

export default Index;
