import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@ui/dialog';
import { Button } from '@ui/button';
import { useToast } from '@ui/use-toast';
import { useGetPost, useSharePost } from '@src/hooks/usePost';
import { useState, useRef, useEffect } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import Post from '@components/Post';
import PostLoader from '@components/Loader/PostLoader';

interface IndexProps {
  postId: number;
  sharedPostId?: number;
  children: React.ReactNode;
}

const Index: React.FC<IndexProps> = ({ children, postId, sharedPostId }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    text: '',
  });

  const sharePost = useSharePost();

  // if the post is a shared post get the original post ID else get the post ID
  const getPost = useGetPost(sharedPostId ? sharedPostId : postId, open);

  const textRef = useRef<HTMLParagraphElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = value.text;

    sharePost.mutate({ text, postId });
  };

  const handleChange = (e: ContentEditableEvent) => {
    const text = e.target.value;
    setValue((prev) => ({ ...prev, text: text }));
  };

  useEffect(() => {
    if (sharePost.isSuccess && !sharePost.isError) {
      toast({
        variant: 'success',
        title: 'Sucess!',
        description: 'Post shared successfully',
      });

      // reset text value
      if (textRef.current) {
        textRef.current.innerText = '';
        setValue((prev) => ({ ...prev, text: '' }));
      }
      sharePost.reset();
      setOpen(false);
    }

    if (sharePost.isError) {
      toast({
        variant: 'destructive',
        title: 'Sucess!',
        description: `${sharePost.error.message}`,
      });

      sharePost.reset();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharePost.isError, sharePost.isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:my-5'>
        <DialogHeader>
          <DialogTitle className='text-center'>SHARE POST</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='relative w-full'>
          <div className='relative my-3'>
            <ContentEditable
              innerRef={textRef}
              className={`mb-2 focus-visible:outline-none bg-transparent break-all`}
              html={value.text}
              onChange={handleChange}
              tagName='p'
            />

            {/* Placeholder for the ContentEditable */}
            {!value.text && (
              <p className='absolute top-0 text-gray-500 pointer-events-none'>
                Input your post content here.
              </p>
            )}
          </div>

          {getPost.isLoading ? (
            <PostLoader hasImg={false} />
          ) : (
            getPost.data && <Post data={getPost.data.data} hasFooter={false} />
          )}

          <DialogFooter className='mt-4'>
            <Button
              type='submit'
              variant={'default'}
              loading={sharePost.isLoading}
              fullWidth
            >
              SHARE
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
