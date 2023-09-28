import ContainerXl from '@components/ContainerXl';
import CreatePost from '@components/CreatePost';
import ActionBtn from './ActionBtn';
import UserPosts from './UserPosts';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProfile } from '@src/hooks/useProfile';

const Index = () => {
  const { id } = useParams();
  const profile = useGetProfile(id);

  const nameRenderer = useCallback((): string => {
    if (profile.data?.data.profile) {
      return `${profile.data.data.profile.firstName} ${profile.data.data.profile.middleName} ${profile.data.data.profile.lastName}`;
    } else if (profile.data?.data.email) {
      return `${profile.data.data.email}`;
    } else return ``;
  }, [profile.data]);

  if (profile.isStale && !profile.data) {
    return null;
  }

  return (
    <ContainerXl className='bg-white mb-4'>
      {/* Cover Container*/}
      <div className='relative bg-slate-200 w-full h-60 rounded-b-lg'>
        {profile.data?.data.profile?.coverPhoto ? (
          <img
            className='w-full h-full object-cover rounded-b-lg'
            src={profile.data?.data.profile?.coverPhoto}
            alt='Post Photo'
          />
        ) : (
          <span className='absolute inset-0 flex items-center justify-center text-slate-500'>
            Cover Photo
          </span>
        )}
      </div>
      {/* End Cover Container*/}

      <div className='px-2'>
        {/* Profile Container */}
        <div className='relative flex flex-col sm:flex-row items-center sm:items-start'>
          <div className='relative -top-7 sm:-top-7 sm:left-5 p-1 bg-slate-300 rounded-full w-fit'>
            <Avatar className='w-[150px] h-[150px]'>
              <AvatarImage src={profile.data?.data.profile?.profilePhoto} />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
          </div>

          <div className='-mt-5 sm:ml-8 sm:mt-3'>
            <h1 className='text-2xl sm:text-2xl text-center font-bold break-all text-gray-700'>
              {nameRenderer()}
            </h1>
            <ActionBtn id={id ?? ''} />
          </div>
        </div>
        {/* End Profile Container */}

        <div className='px-1 sm:px-2'>
          <CreatePost className='mt-6' />

          <UserPosts id={id ?? ''} />
        </div>
      </div>
    </ContainerXl>
  );
};

export default Index;
