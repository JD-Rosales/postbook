import { Avatar, AvatarFallback, AvatarImage } from '@src/components/ui/avatar';
import { Button } from '@src/components/ui/button';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { useToast } from '@ui/use-toast';
import { useGetProfile, useUpdateProfile } from '@src/hooks/useUser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getErrorMessage } from '@src/lib/utils';

type ContentProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Content({ setOpen }: ContentProps) {
  const { id } = useParams();
  const profile = useGetProfile(id);
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: profile.data?.data.profile?.firstName ?? '',
    middleName: profile.data?.data.profile?.middleName ?? '',
    lastName: profile.data?.data.profile?.lastName ?? '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProfile.mutate(formData);
  };

  useEffect(() => {
    if (updateProfile.isSuccess && !updateProfile.isError) {
      // reset states
      updateProfile.reset();
      setOpen(false);
      toast({
        variant: 'success',
        title: 'Sucess!',
        description: 'Profile updated successfully',
      });
    }

    if (updateProfile.isError) {
      // reset states
      updateProfile.reset();
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: getErrorMessage(updateProfile.error?.message),
      });
    }
  }, [toast, updateProfile]);

  return (
    <div>
      <section className='flex flex-col mb-4'>
        <div className='flex flex-row font-medium'>
          <span>Profile picture</span>
        </div>
        <div className='w-full flex justify-center'>
          <Avatar className='text-sm h-36 w-36'>
            <AvatarImage src={''} />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section className='flex flex-col mb-4'>
        <div className='flex flex-row font-medium'>
          <span>Cover photo</span>
        </div>
        <div className='w-full flex justify-center px-12 pt-2'>
          <div className='relative bg-slate-100 w-full h-44 rounded-lg'>
            {profile.data?.data.profile?.coverPhoto ? (
              <img
                className='w-full h-full object-cover rounded-lg'
                src={profile.data?.data.profile?.coverPhoto}
                alt='Post Photo'
              />
            ) : (
              <span className='absolute inset-0 flex items-center justify-center text-slate-500'>
                Cover photo
              </span>
            )}
          </div>
        </div>
      </section>

      <section className='flex flex-col mt-6 mb-4'>
        <div className='flex flex-row font-medium'>
          <span>Profile Information</span>
        </div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col pt-2'>
          <Label htmlFor='firstName' className='text-base mt-2 text-slate-600'>
            First Name:
          </Label>
          <Input
            id='firstName'
            name='firstName'
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder='Input First Name'
          />

          <Label htmlFor='middleName' className='text-base mt-2 text-slate-600'>
            Middle Name:
          </Label>
          <Input
            id='middleName'
            name='middleName'
            value={formData.middleName}
            onChange={handleInputChange}
            placeholder='Input Middle Name'
          />

          <Label htmlFor='lastName' className='text-base mt-2 text-slate-600'>
            Last Name:
          </Label>
          <Input
            id='lastName'
            name='lastName'
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder='Input Last Name'
          />

          <Button type='submit' variant={'default'} className='mt-5'>
            Save
          </Button>
        </form>
      </section>
    </div>
  );
}
