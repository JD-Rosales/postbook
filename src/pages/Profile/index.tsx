import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { Label } from '@ui/label';
import { Input } from '@ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@ui/dialog';
import { useToast } from '@ui/use-toast';
import { useUpdateProfile, useGetProfile } from '@src/hooks/useAuth';
import { useParams } from 'react-router-dom';
import { AiFillCamera, AiFillEdit } from 'react-icons/ai';
import { RiUserFollowFill } from 'react-icons/ri';
import { useEffect, useState, useRef } from 'react';
import { parseJwt } from '@lib/utils';
import PageNotFound from '@pages/NotFound';

type formDataType = {
  firstName: string;
  middleName: string;
  lastName: string;
  profilePhoto: string;
  coverPhoto: string;
};

const Index = () => {
  const { id } = useParams();
  const updateProfile = useUpdateProfile();
  const userProfile = useGetProfile(id ? parseInt(id) : 0);
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<formDataType>({
    firstName: '',
    middleName: '',
    lastName: '',
    profilePhoto: '',
    coverPhoto: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    updateProfile.mutate(formData);
  };
  const inputFileProfile = useRef<HTMLInputElement | null>(null);
  const inputFileCover = useRef<HTMLInputElement | null>(null);

  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const name = e.target.name;
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          [name]: reader.result?.toString(),
        }));
      };
      reader.onerror = () => {
        toast({
          variant: 'destructive',
          title: 'An error has occured!',
          description: 'Selected file cannot be read',
        });
      };
    }
  };

  useEffect(() => {
    if (userProfile.data?.data) {
      setFormData({
        firstName: userProfile.data?.data?.firstName || '',
        middleName: userProfile.data?.data?.middleName || '',
        lastName: userProfile.data?.data?.lastName || '',
        profilePhoto: userProfile.data?.data?.profilePhoto || '',
        coverPhoto: userProfile.data?.data?.coverPhoto || '',
      });
    }
  }, [userProfile.data, userProfile.isSuccess]);

  useEffect(() => {
    if (updateProfile.isSuccess && !updateProfile.isError) {
      setOpen(false);
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Profile updated successfully',
      });
    }
    if (updateProfile.isError) {
      toast({
        variant: 'destructive',
        title: 'An error has occured!',
        description: updateProfile.error?.message,
      });
    }
  }, [
    updateProfile.isSuccess,
    updateProfile.isError,
    updateProfile.error?.message,
    toast,
  ]);

  if (userProfile.isError) {
    return <PageNotFound />;
  }

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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className='mt-4 ml-1 py-5 font-bold'
                  variant={'default'}
                >
                  <AiFillEdit className='mr-2 w-5 h-5' />
                  EDIT PROFILE
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:my-5'>
                <DialogHeader>
                  <DialogTitle className='text-center'>
                    EDIT PROFILE
                  </DialogTitle>
                </DialogHeader>

                <div>
                  <div className='flex justify-between items-center'>
                    <span className='font-bold'>Profile Picture</span>
                    <Button
                      className='py-4 mt-0'
                      variant={'ghost'}
                      onClick={() => {
                        inputFileProfile.current?.click();
                      }}
                    >
                      {userProfile.data?.data?.profilePhoto ? 'EDIT' : 'ADD'}
                    </Button>
                  </div>
                  <Input
                    type='file'
                    className='hidden'
                    ref={inputFileProfile}
                    accept='image/x-png,image/gif,image/jpeg'
                    name='profilePhoto'
                    onChange={previewImage}
                  />

                  <div className='my-2 relative w-36 h-36 mx-auto rounded-full'>
                    <Avatar className='h-full w-full'>
                      <AvatarImage src={formData.profilePhoto} />
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <div>
                  <div className='flex justify-between items-center'>
                    <span className='font-bold'>Cover Photo</span>
                    <Button
                      className='py-4 mt-0'
                      variant={'ghost'}
                      onClick={() => {
                        inputFileCover.current?.click();
                      }}
                    >
                      {userProfile.data?.data?.coverPhoto ? 'EDIT' : 'ADD'}
                    </Button>
                  </div>
                  <Input
                    type='file'
                    className='hidden'
                    ref={inputFileCover}
                    accept='image/x-png,image/gif,image/jpeg'
                    name='coverPhoto'
                    onChange={previewImage}
                  />

                  <div
                    className={`relative mx-12 mt-4 h-44 rounded-lg ${
                      !formData.coverPhoto && 'bg-slate-100'
                    }`}
                  >
                    {formData.coverPhoto ? (
                      <img
                        className='object-cover w-full h-full rounded-lg'
                        src={formData.coverPhoto}
                      />
                    ) : (
                      <span className='absolute inset-0 flex items-center justify-center'>
                        DP
                      </span>
                    )}
                  </div>
                </div>

                <span className='font-bold mt-6'>Profile Data</span>
                <div className='grid gap-4 pb-4'>
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
                        value={formData.firstName}
                        onChange={handleChange}
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
                        value={formData.middleName}
                        onChange={handleChange}
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
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant={'default'}
                    loading={updateProfile.isLoading}
                    onClick={handleSubmit}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
