import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { AiFillCamera } from 'react-icons/ai';
import { RiUserFollowFill } from 'react-icons/ri';

const Index = () => {
  return (
    <div className='max-w-xl mx-auto'>
      <div className='relative h-52 rounded-b-lg mb-[90px]'>
        <img
          className='object-cover w-full h-full rounded-b-lg'
          src='https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='Profile Cover Photo'
        />
        <div className='absolute -bottom-20 right-0 left-0'>
          <div className='text-black relative w-44 h-44 mx-auto p-1 rounded-full bg-slate-300'>
            <Avatar className='h-full w-full'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>

            <button className='bg-gray-200 hover:bg-slate-300 p-2 rounded-full absolute bottom-5 right-1'>
              <AiFillCamera className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
      <span className='text-center text-3xl font-medium block'>
        Jake D. Rosales
      </span>
      <div className=' flex justify-center'>
        <Button className='mt-4 pl-14 pr-12 py-5 font-bold' variant={'default'}>
          FOLLOW
          <RiUserFollowFill className='ml-2 w-5 h-5' />
        </Button>
      </div>
    </div>
  );
};

export default Index;
