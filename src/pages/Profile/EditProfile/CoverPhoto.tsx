import { useFileUpload } from '@src/hooks/useFileUpload';
import { useUpdateCoverPhoto } from '@src/hooks/useUser';
import { useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import { useToast } from '@src/components/ui/use-toast';
import { Progress } from '@src/components/ui/progress';
import { getErrorMessage } from '@src/lib/utils';

type CoverPhotoProps = {
  photo?: string;
};

export default function CoverPhoto({ photo }: CoverPhotoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileUpload = useFileUpload(2);
  const updateCoverPhoto = useUpdateCoverPhoto();
  const { toast } = useToast();

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleUpdateProfile = (coverPhoto: string, coverPublicId: string) => {
    updateCoverPhoto.mutate({
      coverPhoto,
      coverPublicId,
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
    if (updateCoverPhoto.isError) {
      updateCoverPhoto.reset();
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: getErrorMessage(updateCoverPhoto.error?.message),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCoverPhoto]);

  return (
    <section className='flex flex-col mb-4'>
      <div className='flex flex-row font-medium'>
        <span>Cover photo</span>
      </div>
      <div className='w-full flex flex-col justify-center px-16 pt-2'>
        <div className='relative bg-slate-100 w-full h-44 rounded-lg'>
          {photo ? (
            <img
              className='w-full h-full object-cover rounded-lg'
              src={photo}
              alt='Cover Photo'
            />
          ) : (
            <span className='absolute inset-0 flex items-center justify-center text-slate-500'>
              Cover photo
            </span>
          )}

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
            name='cover-uploader'
            id={`cover-uploader`}
            multiple={false}
            accept='image/*'
            onChange={handleCoverPhotoChange}
          />
        </div>

        {fileUpload.isLoading && (
          <Progress value={fileUpload.progress} className='mt-4' />
        )}
      </div>
    </section>
  );
}
