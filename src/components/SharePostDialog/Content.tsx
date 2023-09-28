import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/tooltip';
import { Progress } from '@ui/progress';
import { useToast } from '@ui/use-toast';
import { Camera, Laugh, X, Repeat2 } from 'lucide-react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useNavigate } from 'react-router-dom';
import { useGetProfile } from '@src/hooks/useProfile';
import { parseJwtId, cn, getErrorMessage } from '@lib/utils';
import { useSharePost } from '@src/hooks/usePost';
import { useFileUpload } from '@src/hooks/useFileUpload';
import SharedPost from '@components/SharedPost';

type ContentProps = {
  className?: string;
  postId: number;
  originPostId?: number | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Content: React.FC<ContentProps> = ({
  className,
  postId,
  originPostId,
  setOpen,
}) => {
  const [formData, setFormData] = useState({
    text: '',
    photo: '',
    photoPublicId: '',
  });
  const sharePost = useSharePost();
  const fileUploader = useFileUpload(1);
  const userProfile = useGetProfile(parseJwtId()?.toString() ?? '');
  const inputTextRef = useRef<HTMLParagraphElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async () => {
    let data = { ...formData };
    if (formData.photo) {
      const response = await fileUploader.mutateAsync(formData.photo);
      if (response.status === 200) {
        data = { ...data, photo: response.data.secure_url };
        data = { ...data, photoPublicId: response.data.public_id };
      }
    }

    // share the orignal post if the post is also a shared post
    sharePost.mutate({ ...data, postId: originPostId ?? postId });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (res) => {
        setFormData((prev) => ({
          ...prev,
          photo: res.target?.result?.toString() ?? '',
        }));
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    } else {
      handleResetPhoto();
    }
  };

  const handleChange = (e: ContentEditableEvent) => {
    const text = e.target.value;

    setFormData((prev) => ({ ...prev, text: text }));
  };

  const handleResetPhoto = () => {
    setFormData((prev) => ({ ...prev, photo: '' }));
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  useEffect(() => {
    if (sharePost.isSuccess && !sharePost.isError) {
      // reset states
      handleResetPhoto();
      setFormData({ text: '', photo: '', photoPublicId: '' });
      fileUploader.reset();
      sharePost.reset();
      setOpen(false);
      toast({
        variant: 'success',
        title: 'Sucess!',
        description: 'Post shared successfully',
      });
    }

    if (sharePost.isError) {
      sharePost.reset();
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: getErrorMessage(sharePost.error?.message),
      });
    }
  }, [
    sharePost,
    sharePost.error?.message,
    sharePost.isError,
    sharePost.isSuccess,
    fileUploader,
    toast,
    setOpen,
  ]);
  return (
    <>
      <Card className={cn('', className)}>
        <CardContent className='px-2 md:px-4 pb-4'>
          <div className='flex mt-4 mb-4'>
            <div>
              <Avatar
                onClick={() => {
                  navigate('/user/' + userProfile.data?.data.id);
                }}
                className='w-[55px] h-[55px] cursor-pointer hover:scale-110 transform transition-transform duration-300 ease-out'
              >
                <AvatarImage
                  src={userProfile.data?.data.profile?.profilePhoto}
                />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            </div>

            <div className='relative w-full ml-3 px-2 pb-2 pt-4 bg-slate-100 text-gray-600 rounded-xl'>
              <ContentEditable
                innerRef={inputTextRef}
                disabled={false}
                className={`mb-2 focus-visible:outline-none bg-transparent break-all`}
                html={formData.text}
                onChange={handleChange}
                tagName='p'
              />

              {/* Placeholder for the ContentEditable */}
              {formData.text === '' && (
                <p className='absolute top-0 w-full pr-1 pb-2 pt-4 text-gray-500 truncate pointer-events-none'>
                  What's on your mind
                  {userProfile.data?.data.profile?.firstName &&
                    `, ${userProfile.data?.data.profile?.firstName}`}
                  ?
                </p>
              )}
            </div>
          </div>
          {formData.photo && (
            <div className='w-full rounded-lg mt-2 px-4 mb-4 pl-[65px]'>
              <div className='rounded-lg relative'>
                <div className='flex justify-center'>
                  <div className='min-h-[100px] max-h-[400px]'>
                    <img
                      src={formData.photo}
                      alt='Post'
                      className='max-w-full h-auto max-h-[100%] mx-auto rounded-md'
                    />
                  </div>
                </div>

                <span
                  onClick={handleResetPhoto}
                  className='absolute top-3 right-3 bg-slate-100 rounded-xl p-1 cursor-pointer hover:scale-110 transform transition-transform duration-300 ease-out'
                >
                  <X className='text-green-600' />
                </span>

                {fileUploader.isLoading && (
                  <Progress
                    value={fileUploader.progress}
                    className='w-full mt-3 mb-2 h-3'
                  />
                )}
              </div>
            </div>
          )}

          <div className='flex justify-end mt-2 mb-2'>
            <div className='grid grid-cols-12 gap-1'>
              <div className='col-span-6 flex justify-end'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        onClick={() => {
                          if (inputFileRef.current)
                            inputFileRef.current.click();
                        }}
                        className='p-1 cursor-pointer'
                      >
                        <Camera size={35} color='green' />

                        {/* hidden input */}
                        <input
                          ref={inputFileRef}
                          className='absolute right-[99999px] invisible'
                          type='file'
                          accept='.png, .jpg, .jpeg'
                          name='img-uploader'
                          id={`img-uploader`}
                          multiple={false}
                          onChange={handleFileChange}
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Photo/Video</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className='col-span-6 flex justify-end'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className='p-1 cursor-pointer'>
                        <Laugh size={35} className='text-yellow-500' />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Coming soon...</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          {/* Render the orignal post if the post is also a shared post */}
          <SharedPost postId={originPostId ?? postId} />
        </CardContent>
      </Card>

      <Button
        onClick={handleSubmit}
        className='px-3 sm:px-4 py-6 mb-3 -mt-1 w-full md:w-40 md:ml-auto'
        variant={'default'}
        loading={fileUploader.isLoading || sharePost.isLoading}
      >
        <Repeat2 size={25} />
        <span className='ml-2 text-white truncate'>Share now</span>
      </Button>
    </>
  );
};

export default Content;
