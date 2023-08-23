import { useState, useRef, Suspense, lazy, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@ui/dialog';
import { Input } from '@ui/input';
import { Button } from '@ui/button';
import { useToast } from '@ui/use-toast';
import { Progress } from '@ui/progress';
import { SmilePlus, Image, X } from 'lucide-react';
import { EmojiClickData } from 'emoji-picker-react';
import { useFileUpload } from '@src/hooks/useFileUpload';
import { useCreatePost } from '@src/hooks/usePost';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import usePostDialog from '@src/contextsHooks/usePostDialog';
import EmojiPickerLoader from '@components/Loader/EmojiPickerLoader';

const EmojiPicker = lazy(() => import('@components/EmojiPicker'));

const Index = () => {
  const { isOpen, setIsOpen } = usePostDialog();
  const [emojiPickerShown, setEmojiPickerShown] = useState(false);
  const [imgPrev, setImgPrev] = useState('');
  const [text, setText] = useState('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  const fileUpload = useFileUpload(1);
  const createPost = useCreatePost();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let photo = imgPrev;
    let photoPublicId;
    if (imgPrev) {
      const response = await fileUpload.mutateAsync(imgPrev);
      if (response.status === 200) {
        photo = response.data.secure_url;
        photoPublicId = response.data.public_id;
      }
    }

    createPost.mutate({ text, photo, photoPublicId });
  };

  const handleChange = (e: ContentEditableEvent) => {
    const text = e.target.value;

    setText(text);
  };

  const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    if (textRef.current && event) {
      setText((prev) => prev + emoji.emoji);
    }
  };

  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const res = reader.result?.toString();
        if (res) setImgPrev(res);
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

  const handleClickOutside = (e: MouseEvent) => {
    if (!emojiRef.current?.contains(e.target as Node)) {
      setEmojiPickerShown(false);
      document.removeEventListener('click', handleClickOutside, true);
    }
  };

  useEffect(() => {
    if (createPost.isSuccess && !createPost.isError) {
      // reset states
      setImgPrev('');
      if (textRef.current) {
        textRef.current.value = '';
      }
      fileUpload.reset();

      setIsOpen(false);
      setText('');
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Post created successfully',
      });
    }
    if (createPost.isError) {
      toast({
        variant: 'destructive',
        title: 'An error has occured!',
        description: createPost.error?.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPost.isSuccess, createPost.isError, toast]);

  useEffect(() => {
    if (emojiPickerShown) {
      document.addEventListener('click', handleClickOutside, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emojiPickerShown]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:my-5'>
        <DialogHeader>
          <DialogTitle className='text-center'>CREATE POST</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='mt-3'>
            <div className='relative mb-6'>
              <ContentEditable
                innerRef={textRef}
                className={`mb-2 focus-visible:outline-none bg-transparent break-all`}
                html={text}
                onChange={handleChange}
                tagName='p'
              />
              {/* Placeholder for the ContentEditable */}
              {!text && (
                <p className='absolute top-0 text-gray-500 pointer-events-none'>
                  Input your post content here.
                </p>
              )}
            </div>
            <Input
              type='file'
              className='hidden'
              ref={fileRef}
              accept='.png, .jpg, .jpeg'
              name='postPhoto'
              onChange={previewImage}
            />

            {imgPrev && (
              <div className='relative w-full h-[300px] mt-3 rounded-lg'>
                <img
                  className='rounded-lg w-full h-full object-cover'
                  src={imgPrev}
                  alt=''
                />
                <span
                  className='absolute top-3 right-3 hover:opacity-80 p-1 rounded-full cursor-pointer bg-slate-600'
                  onClick={() => {
                    setImgPrev('');
                    if (fileRef.current) {
                      fileRef.current.value = '';
                    }
                  }}
                >
                  <X color='white' size={25} />
                </span>
              </div>
            )}

            {fileUpload.isLoading && (
              <Progress
                value={fileUpload.progress}
                className='w-full mt-3 h-3'
              />
            )}
          </div>

          <div className='relative mt-1 flex justify-end'>
            <button
              type='button'
              className='p-2 block'
              onClick={() => {
                fileRef.current?.click();
              }}
            >
              <Image className='text-green-500' size={30} />
            </button>

            <button
              type='button'
              className='p-2 block'
              onClick={() => {
                setEmojiPickerShown(true);
              }}
            >
              <SmilePlus className='text-orange-500' size={30} />
            </button>

            <div className='absolute -top-[270px] -right-[350px] z-50'>
              {emojiPickerShown && (
                <Suspense fallback={<EmojiPickerLoader />}>
                  <EmojiPicker ref={emojiRef} onEmojiClick={handleEmojiClick} />
                </Suspense>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type='submit'
              variant={'default'}
              loading={createPost.isLoading || fileUpload.isLoading}
              fullWidth
            >
              POST
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
