import { Button } from '@src/components/ui/button';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { useToast } from '@ui/use-toast';
import { useGetProfile, useUpdateProfile } from '@src/hooks/useUser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getErrorMessage } from '@src/lib/utils';
import ProfilePhoto from './ProfilePhoto';
import CoverPhoto from './CoverPhoto';

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
  }, [setOpen, toast, updateProfile]);

  return (
    <div>
      {/* only show profile and cover upload if user has already first name and last */}
      {profile.data?.data.profile && (
        <>
          <ProfilePhoto photo={profile.data?.data.profile?.profilePhoto} />
          <CoverPhoto photo={profile.data?.data.profile?.coverPhoto} />
        </>
      )}

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
