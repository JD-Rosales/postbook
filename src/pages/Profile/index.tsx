import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { Label } from '@ui/label';
import { Input } from '@ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@ui/dialog';

import { AiFillCamera, AiFillEdit } from 'react-icons/ai';
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
        <Button className='mt-4 mr-1 py-5 font-bold' variant={'default'}>
          <RiUserFollowFill className='mr-2 w-5 h-5' />
          FOLLOW
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button className='mt-4 ml-1 py-5 font-bold' variant={'default'}>
              <AiFillEdit className='mr-2 w-5 h-5' />
              EDIT PROFILE
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>EDIT PROFILE</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <div className='col-span-1 text-right'>
                  <Label htmlFor='firstName'>First Name:</Label>
                </div>
                <div className='col-span-3'>
                  <Input
                    className=''
                    type='text'
                    placeholder='First Name'
                    name='firstName'
                    required
                  />
                </div>
              </div>

              <div className='grid grid-cols-4 gap-4 items-center'>
                <div className='col-span-1 text-right'>
                  <Label htmlFor='middleName'>Middle Name:</Label>
                </div>
                <div className='col-span-3'>
                  <Input
                    className=''
                    type='text'
                    placeholder='Middle Name'
                    name='middleName'
                  />
                </div>
              </div>

              <div className='grid grid-cols-4 gap-4 items-center'>
                <div className='col-span-1 text-right'>
                  <Label htmlFor='lastName'>Last Name:</Label>
                </div>
                <div className='col-span-3'>
                  <Input
                    className=''
                    type='text'
                    placeholder='Last Name'
                    name='lastName'
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
