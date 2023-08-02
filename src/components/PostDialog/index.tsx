import { useState, useRef, Suspense, lazy, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@ui/dialog';
import { Textarea } from '@ui/textarea';
import { Button } from '@ui/button';
import { SmilePlus, Image } from 'lucide-react';
import { EmojiClickData } from 'emoji-picker-react';
import PickerSkeleton from '@components/Loader/EmojiPickerSkeleton';

const EmojiPicker = lazy(() => import('@components/EmojiPicker'));

interface IndexProps {
  children: React.ReactNode;
}

const Index: React.FC<IndexProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [emojiPickerShown, setEmojiPickerShown] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    if (textRef.current) {
      textRef.current.value = textRef.current.value + emoji.emoji;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = textRef.current?.value;
    console.log(text);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!emojiRef.current?.contains(e.target as Node)) {
      setEmojiPickerShown(false);
      document.removeEventListener('click', handleClickOutside, true);
    }
  };

  useEffect(() => {
    if (emojiPickerShown) {
      document.addEventListener('click', handleClickOutside, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emojiPickerShown]);

  useEffect(() => {
    setEmojiPickerShown(false);
  }, [open, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:my-5'>
        <DialogHeader>
          <DialogTitle className='text-center'>CREATE POST</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='mt-3'>
            <Textarea
              ref={textRef}
              className='text-base'
              placeholder='Type your post text here.'
              name='text'
            />
          </div>

          <div className='relative mt-1 flex justify-end'>
            <button className='p-2 block'>
              <Image className='text-green-500' size={30} />
            </button>

            <button
              className='p-2 block'
              onClick={() => {
                setEmojiPickerShown(true);
              }}
            >
              <SmilePlus className='text-orange-500' size={30} />
            </button>

            <div className='absolute -top-[270px] -right-[350px] z-50'>
              {emojiPickerShown && (
                <Suspense fallback={<PickerSkeleton />}>
                  <EmojiPicker ref={emojiRef} onEmojiClick={handleEmojiClick} />
                </Suspense>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type='submit' variant={'default'} fullWidth>
              POST
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
