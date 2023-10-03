import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/tooltip';
import Header from './Header';
import { Progress } from '@ui/progress';
import { useToast } from '@ui/use-toast';
import { useGetPost, useUpdatePost } from '@src/hooks/usePost';
import PostLoader from '../Loader/PostLoader';
import { Card, CardContent } from '../ui/card';
import { cn, getErrorMessage } from '@src/lib/utils';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import SharedPost from '@src/components/SharedPost';
import { Camera, Laugh, PenLine, Save, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useFileUpload } from '@src/hooks/useFileUpload';

type IndexProps = {
  children: React.ReactNode;
  postId: number;
  originPostId?: number | null;
  className?: string;
};

const Index: React.FC<IndexProps> = ({ children, postId, className }) => {
  const [open, setOpen] = useState(false);
  const post = useGetPost(postId);
  const updatePost = useUpdatePost();
  const fileUploader = useFileUpload(1);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    text: post.data?.data?.text ?? '',
    photo: post.data?.data?.photo ?? '',
    photoPublicId: '',
  });

  const inputTextRef = useRef<HTMLParagraphElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    let data = { ...formData };
    if (formData.photo) {
      if (formData.photo !== post.data?.data.photo) {
        const response = await fileUploader.mutateAsync(formData.photo);
        if (response.status === 200) {
          data = { ...data, photo: response.data.secure_url };
          data = { ...data, photoPublicId: response.data.public_id };
        }
      }
    }

    updatePost.mutate({ ...data, postId: postId });
  };

  const handleChange = (e: ContentEditableEvent) => {
    const text = e.target.value;

    setFormData((prev) => ({ ...prev, text: text }));
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

  const handleResetPhoto = () => {
    setFormData((prev) => ({ ...prev, photo: '' }));
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  useEffect(() => {
    if (updatePost.isSuccess && !updatePost.isError) {
      // reset states
      handleResetPhoto();
      fileUploader.reset();
      updatePost.reset();
      setOpen(false);
      toast({
        variant: 'success',
        title: 'Sucess!',
        description: 'Post updated successfully',
      });
    }

    if (updatePost.isError) {
      updatePost.reset();
      fileUploader.reset();
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: getErrorMessage(updatePost.error?.message),
      });
    }
  }, [
    updatePost,
    updatePost.error?.message,
    updatePost.isError,
    updatePost.isSuccess,
    fileUploader,
    toast,
    setOpen,
  ]);

  // reset state when dialog close
  useEffect(() => {
    if (!open) {
      setFormData({
        text: post.data?.data?.text ?? '',
        photo: post.data?.data?.photo ?? '',
        photoPublicId: '',
      });
    }
  }, [open, post.data?.data?.photo, post.data?.data?.text]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='px-2 md:px-4 md:my-4 pb-1 max-w-xl'>
        <DialogHeader>
          <DialogTitle className='text-center mb-1 text-xl text-gray-700'>
            Edit post
          </DialogTitle>
        </DialogHeader>
        <>
          {post.isLoading ? (
            <PostLoader />
          ) : (
            <Card className={cn('mb-2', className)}>
              {!post.data?.data ? (
                'Make a component for post not found'
              ) : (
                <>
                  <Header data={post.data.data} />
                  <CardContent className='pb-4'>
                    <div className='relative w-full mt-2 text-gray-600 mb-2'>
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
                        <p className='absolute top-0 w-full pr-1 pb-2 text-gray-500 truncate pointer-events-none'>
                          What's on your mind?
                        </p>
                      )}
                    </div>

                    <div className='flex justify-end mb-2'>
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
                                  <Camera size={30} color='green' />

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
                                  <Laugh
                                    size={30}
                                    className='text-yellow-500'
                                  />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <span>Emoji (Coming soon...)</span>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>

                    {formData.photo && (
                      <div className='flex justify-center'>
                        <div className='relative min-h-[100px] max-h-[400px] rounded-md bg-slate-100'>
                          <img
                            src={formData.photo}
                            alt='Post Image'
                            className='max-w-full h-auto max-h-[100%] mx-auto rounded-md'
                          />

                          <span
                            onClick={() => {
                              if (inputFileRef.current)
                                inputFileRef.current.click();
                            }}
                            className='absolute top-2 right-11 p-[6px] bg-slate-300 rounded-lg cursor-pointer hover:opacity-80'
                          >
                            <PenLine size={15} />
                          </span>

                          <span
                            onClick={handleResetPhoto}
                            className='absolute top-2 right-2 p-[6px] bg-slate-300 rounded-lg cursor-pointer hover:opacity-80'
                          >
                            <X size={15} />
                          </span>
                        </div>
                      </div>
                    )}

                    {fileUploader.isLoading && (
                      <div className='px-2'>
                        <Progress
                          value={fileUploader.progress}
                          className='w-full mt-3 mb-2 h-3'
                        />
                      </div>
                    )}

                    {post.data.data.sharedPostId && (
                      <SharedPost postId={post.data.data.sharedPostId} />
                    )}
                  </CardContent>
                </>
              )}
            </Card>
          )}
          <Button
            onClick={handleSubmit}
            className='px-3 sm:px-4 py-6 mb-3 -mt-1 w-full md:w-40 md:ml-auto'
            variant={'default'}
            loading={updatePost.isLoading || fileUploader.isLoading}
          >
            <Save size={22} />
            <span className='ml-2 text-white truncate'>Save changes</span>
          </Button>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
