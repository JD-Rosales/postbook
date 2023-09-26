import { useEffect, useRef, useState } from 'react';
import { Card, CardFooter, CardContent } from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { AspectRatio } from '@ui/aspect-ratio';
import { Button } from '@ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/tooltip';
import { Progress } from '@ui/progress';
import { useToast } from '@ui/use-toast';
import { Camera, Laugh, SendHorizontal, X } from 'lucide-react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useNavigate } from 'react-router-dom';
import { useGetProfile } from '@src/hooks/useProfile';
import { parseJwtId, cn, getErrorMessage } from '@lib/utils';
import { useCreatePost } from '@src/hooks/usePost';
import { useFileUpload } from '@src/hooks/useFileUpload';

type IndexProps = {
  className?: string;
};

const Index: React.FC<IndexProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    text: '',
    photo: '',
    photoPublicId: '',
  });
  const createPost = useCreatePost();
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
      console.log(response);
      if (response.status === 200) {
        data = { ...data, photo: response.data.secure_url };
        data = { ...data, photoPublicId: response.data.public_id };
      }
    }

    createPost.mutate(data);
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
    if (createPost.isSuccess && !createPost.isError) {
      // reset states
      handleResetPhoto();
      setFormData({ text: '', photo: '', photoPublicId: '' });
      fileUploader.reset();
      createPost.reset();
      toast({
        variant: 'success',
        title: 'Sucess!',
        description: 'Post created successfully',
      });
    }

    if (createPost.isError) {
      createPost.reset();
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: getErrorMessage(createPost.error?.message),
      });
    }
  }, [
    createPost,
    createPost.error?.message,
    createPost.isError,
    createPost.isSuccess,
    fileUploader,
    toast,
  ]);
  return (
    <Card className={cn('mb-4', className)}>
      <CardContent className='px-2 md:px-4'>
        <div className='flex mt-4'>
          <div>
            <Avatar
              onClick={() => {
                navigate('/user/' + userProfile.data?.data.id);
              }}
              className='w-[55px] h-[55px] cursor-pointer hover:scale-110 transform transition-transform duration-300 ease-out'
            >
              <AvatarImage src={userProfile.data?.data.profile?.profilePhoto} />
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
          <div className='w-full rounded-lg mt-2 px-4 pl-[65px]'>
            <div className='rounded-lg relative'>
              <AspectRatio ratio={16 / 9}>
                <img
                  className='rounded-lg w-full h-full object-cover'
                  src={formData.photo}
                  alt='Post Photo'
                />
              </AspectRatio>

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
      </CardContent>
      <CardFooter>
        <div className='grid grid-cols-12 gap-1 sm:gap-3 w-full'>
          <div className='col-span-4 relative'>
            <Button
              onClick={() => {
                if (inputFileRef.current) inputFileRef.current.click();
              }}
              className='rounded-2xl px-3 sm:px-4'
              variant={'outline'}
              fullWidth
            >
              <Camera size={30} color='green' />
              <span className='ml-2 text-gray-600 truncate'>Photo/Video</span>
            </Button>

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
          </div>

          <div className='col-span-4'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className='rounded-2xl px-3 sm:px-4'
                    variant={'outline'}
                    fullWidth
                  >
                    <Laugh size={30} className='text-yellow-500' />
                    <span className='ml-2 text-gray-600 truncate'>
                      Feels/Emoji
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Coming soon...</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className='col-span-4'>
            <Button
              onClick={handleSubmit}
              className='rounded-2xl px-3 sm:px-4 bg-slate-200'
              variant={'outline'}
              fullWidth
              loading={fileUploader.isLoading || createPost.isLoading}
            >
              <SendHorizontal size={30} className='text-primary' />
              <span className='ml-2 text-gray-600 truncate'>Post/Create</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Index;
