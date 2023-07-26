/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@ui/dialog';
import { Label } from '@ui/label';
import { Input } from '@ui/input';
import { Progress } from '@ui/progress';
import { Button } from '@ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { useState, useEffect, useRef } from 'react';
import { useUpdateProfile } from '@src/hooks/useProfile';
import { useFileUpload } from '@src/hooks/useFileUpload';
import { useToast } from '@ui/use-toast';

type queryDataType = {
  firstName: string;
  middleName?: string;
  lastName: string;
  profilePhoto?: string;
  coverPhoto?: string;
};

interface UpdateDialogProps {
  children: React.ReactNode;
  queryData: queryDataType;
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({ children, queryData }) => {
  const updateProfile = useUpdateProfile();
  const profileUpload = useFileUpload(1);
  const coverUpload = useFileUpload(2);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    profilePhoto: '',
    coverPhoto: '',
  });
  const [imgPrev, setImgPrev] = useState({
    profilePhoto: '',
    coverPhoto: '',
  });

  const inputFileProfile = useRef<HTMLInputElement | null>(null);
  const inputFileCover = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    let data = { ...formData };
    if (imgPrev.profilePhoto) {
      const response = await profileUpload.mutateAsync(imgPrev.profilePhoto);
      if (response.status === 200)
        data = { ...data, profilePhoto: response.data.secure_url };
    }

    if (imgPrev.coverPhoto) {
      const response = await coverUpload.mutateAsync(imgPrev.coverPhoto);
      if (response.status == 200)
        data = { ...data, coverPhoto: response.data.secure_url };
    }

    updateProfile.mutate(data);
  };

  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const name = e.target.name;
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgPrev((prevState) => ({
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
    if (queryData) {
      setFormData({
        firstName: queryData?.firstName || '',
        middleName: queryData?.middleName || '',
        lastName: queryData?.lastName || '',
        profilePhoto: queryData?.profilePhoto || '',
        coverPhoto: queryData?.coverPhoto || '',
      });

      // reset input file when profile updated
      if (inputFileProfile.current) inputFileProfile.current.value = '';
      if (inputFileCover.current) inputFileCover.current.value = '';

      // reset img preview
      setImgPrev({
        profilePhoto: '',
        coverPhoto: '',
      });
    }
  }, [queryData]);

  useEffect(() => {
    if (updateProfile.isSuccess && !updateProfile.isError) {
      // reset states
      setImgPrev({
        profilePhoto: '',
        coverPhoto: '',
      });
      profileUpload.reset();
      coverUpload.reset();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProfile.isSuccess, updateProfile.isError, toast]);

  return (
    <Dialog
      open={open}
      onOpenChange={
        !updateProfile.isLoading &&
        !profileUpload.isLoading &&
        !coverUpload.isLoading
          ? setOpen
          : () => {}
      }
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:my-5'>
        <DialogHeader>
          <DialogTitle className='text-center'>EDIT PROFILE</DialogTitle>
        </DialogHeader>

        <div>
          <div className='flex justify-between items-center'>
            <span className='font-bold'>Profile Picture</span>
            {imgPrev.profilePhoto ? (
              <Button
                className='py-4 mt-0 text-rose-500 hover:text-rose-500'
                variant={'ghost'}
                onClick={() => {
                  if (inputFileProfile.current) {
                    inputFileProfile.current.value = '';
                  }

                  setImgPrev((prevState) => ({
                    ...prevState,
                    profilePhoto: '',
                  }));
                }}
              >
                CANCEL
              </Button>
            ) : (
              <Button
                className='mt-0'
                variant={'ghost'}
                onClick={() => {
                  inputFileProfile.current?.click();
                }}
              >
                {queryData?.profilePhoto ? 'EDIT' : 'ADD'}
              </Button>
            )}
          </div>

          <Input
            type='file'
            className='hidden'
            ref={inputFileProfile}
            accept='.png, .jpg, .jpeg'
            name='profilePhoto'
            onChange={previewImage}
          />

          <div className='mx-12 mt-3'>
            <div className='relative w-44 h-44 mx-auto rounded-full group'>
              <Avatar className='h-full w-full'>
                <AvatarImage
                  src={
                    imgPrev.profilePhoto
                      ? imgPrev.profilePhoto
                      : formData.profilePhoto
                  }
                />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            </div>
            {profileUpload.isLoading && (
              <Progress
                value={profileUpload.progress}
                className='w-full mt-3 h-3'
              />
            )}
          </div>
        </div>

        <div>
          <div className='flex justify-between items-center'>
            <span className='font-bold'>Cover Photo</span>

            {imgPrev.coverPhoto ? (
              <Button
                className='py-4 mt-0 text-rose-500 hover:text-rose-500'
                variant={'ghost'}
                onClick={() => {
                  if (inputFileCover.current) {
                    inputFileCover.current.value = '';
                  }

                  setImgPrev((prevState) => ({
                    ...prevState,
                    coverPhoto: '',
                  }));
                }}
              >
                CANCEL
              </Button>
            ) : (
              <Button
                className='py-4 mt-0'
                variant={'ghost'}
                onClick={() => {
                  inputFileCover.current?.click();
                }}
              >
                {queryData?.coverPhoto ? 'EDIT' : 'ADD'}
              </Button>
            )}
          </div>
          <Input
            type='file'
            className='hidden'
            ref={inputFileCover}
            accept='.png, .jpg, .jpeg'
            name='coverPhoto'
            onChange={previewImage}
          />

          <div className='mx-12 mt-3'>
            <div
              className={`relative h-44 rounded-lg ${
                !formData.coverPhoto && 'bg-slate-100'
              }`}
            >
              {imgPrev.coverPhoto ? (
                <img
                  className='object-cover w-full h-full rounded-lg'
                  src={imgPrev.coverPhoto}
                />
              ) : formData.coverPhoto ? (
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

            {coverUpload.isLoading && (
              <Progress
                value={coverUpload.progress}
                className='w-full mt-3 h-3'
              />
            )}
          </div>
        </div>

        <span className='font-bold mt-4'>Profile Data</span>
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
            className='sm:min-w-[200px]'
            variant={'default'}
            loading={
              updateProfile.isLoading ||
              profileUpload.isLoading ||
              coverUpload.isLoading
            }
            onClick={handleSubmit}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
