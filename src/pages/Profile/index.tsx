import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { useGetProfile } from '@src/hooks/useProfile';
import { useParams } from 'react-router-dom';
import { AiFillCamera, AiFillEdit } from 'react-icons/ai';
import { RiUserFollowFill } from 'react-icons/ri';
import { parseJwt } from '@lib/utils';
import PageNotFound from '@pages/NotFound';
import UpdateDialog from './UpdateDialog';

const Index = () => {
  const { id } = useParams();
  const userProfile = useGetProfile(id ? parseInt(id) : 0);

  if (userProfile.isError) {
    return <PageNotFound />;
  }

  return (
    <div className='max-w-xl mx-auto'>
      <div className='relative bg-slate-100 h-52 rounded-b-lg mb-[90px]'>
        {userProfile.data?.data?.coverPhoto ? (
          <img
            className='object-cover w-full h-full rounded-b-lg'
            src={userProfile.data?.data?.coverPhoto}
            alt='Profile Cover Photo'
          />
        ) : (
          <span className='absolute inset-0 flex items-center justify-center'>
            DP
          </span>
        )}

        <div className='absolute -bottom-20 right-0 left-0'>
          <div className='text-black relative w-44 h-44 mx-auto p-1 rounded-full bg-slate-300'>
            <Avatar className='h-full w-full'>
              <AvatarImage src={userProfile.data?.data?.profilePhoto} />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>

            <button className='bg-gray-200 hover:bg-slate-300 p-2 rounded-full absolute bottom-5 right-1'>
              <AiFillCamera className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
      <span className='text-center text-3xl font-medium block'>
        {userProfile.isSuccess &&
          // show only email if firstName and lastname is not provided
          (userProfile.data?.data?.email
            ? `${userProfile.data?.data?.email}`
            : `${userProfile.data?.data?.firstName} 
          ${userProfile.data?.data?.middleName} 
          ${userProfile.data?.data?.lastName}`)}
      </span>
      <div className=' flex justify-center'>
        {userProfile.isSuccess &&
          (parseJwt().toString() === id ? (
            <UpdateDialog queryData={userProfile.data?.data}>
              <Button className='mt-4 ml-1 py-5 font-bold' variant={'default'}>
                <AiFillEdit className='mr-2 w-5 h-5' />
                EDIT PROFILE
              </Button>
            </UpdateDialog>
          ) : (
            <Button className='mt-4 mr-1 py-5 font-bold' variant={'default'}>
              <RiUserFollowFill className='mr-2 w-5 h-5' />
              FOLLOW
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Index;
