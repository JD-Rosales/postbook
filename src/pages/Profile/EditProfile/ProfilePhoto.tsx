import { Avatar, AvatarFallback, AvatarImage } from '@src/components/ui/avatar';
import { useFileUpload } from '@src/hooks/useFileUpload';
import { useUpdateProfilePhoto } from '@src/hooks/useUser';
import { useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import { useToast } from '@src/components/ui/use-toast';
import { Progress } from '@src/components/ui/progress';
import { getErrorMessage } from '@src/lib/utils';

type ProfilePhotoProps = {
  photo?: string;
};

export default function ProfilePhoto({ photo }: ProfilePhotoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileUpload = useFileUpload(1);
  const updateProfilePhoto = useUpdateProfilePhoto();
  const { toast } = useToast();

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async (res) => {
        const image = res.target?.result;
        if (image) {
          const res = await fileUpload.mutateAsync(image.toString());
          if (res.status === 200) {
            handleUpdateProfile(res.data.secure_url, res.data.public_id);
          }
        }
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  };

  const handleUpdateProfile = (
    profilePhoto: string,
    profilePublicId: string
  ) => {
    updateProfilePhoto.mutate({
      profilePhoto,
      profilePublicId,
    });
  };

  useEffect(() => {
    if (fileUpload.isSuccess) {
      fileUpload.reset();
    }
    if (fileUpload.isError) {
      fileUpload.reset();
    }
  }, [fileUpload]);

  useEffect(() => {
    if (updateProfilePhoto.isError) {
      updateProfilePhoto.reset();
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: getErrorMessage(updateProfilePhoto.error?.message),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProfilePhoto]);

  return (
    <section className='flex flex-col mb-4'>
      <div className='flex flex-row font-medium'>
        <span>Profile picture</span>
      </div>
      <div className='relative w-fit p-1 rounded-full bg-slate-300 mx-auto'>
        <Avatar className='text-sm h-40 w-40'>
          <AvatarImage src={photo} />
          <AvatarFallback>Profile</AvatarFallback>
        </Avatar>

        <span
          onClick={() => {
            if (inputRef.current) inputRef.current.click();
          }}
          className='absolute top-2 right-2 p-2 rounded-full bg-slate-200'
        >
          <Camera size={20} />
        </span>

        <input
          ref={inputRef}
          className='absolute w-full h-full cursor-pointer opacity-0'
          type='file'
          name='profile-uploader'
          id={`profile-uploader`}
          multiple={false}
          accept='image/*'
          onChange={handleProfilePhotoChange}
        />
      </div>

      {fileUpload.isLoading && (
        <Progress value={fileUpload.progress} className='mt-4' />
      )}
    </section>
  );
}
