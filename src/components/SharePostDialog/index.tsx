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
import { useToast } from '@ui/use-toast';
import { useGetPost, useSharePost } from '@src/hooks/usePost';
import { useState, useRef, useEffect } from 'react';
import Post from './Post';

interface IndexProps {
  postId: number;
  children: React.ReactNode;
}

const Index: React.FC<IndexProps> = ({ children, postId }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const sharePost = useSharePost();
  const getPost = useGetPost(postId, open);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = textRef.current?.value;

    sharePost.mutate({ text, postId });
  };

  useEffect(() => {
    if (sharePost.isSuccess && !sharePost.isError) {
      toast({
        variant: 'success',
        title: 'Sucess!',
        description: 'Post shared successfully',
      });

      // reset textarea value
      if (textRef.current) {
        textRef.current.value = '';
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
        <form onSubmit={handleSubmit}>
          <div className='mt-3 mb-3'>
            <Textarea
              ref={textRef}
              className='text-base min-h-[10px] '
              placeholder='Type your post text here.'
              name='text'
            />
          </div>

          {getPost.data && <Post data={getPost.data.data} />}

          <DialogFooter className='mt-4'>
            <Button type='submit' variant={'default'} loading={false} fullWidth>
              SHARE
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
