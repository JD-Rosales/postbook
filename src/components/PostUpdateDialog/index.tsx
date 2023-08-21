import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@ui/dialog';
import { Button } from '@ui/button';
import Post from '@components/Post';
import usePostState from '@src/contextsHooks/usePostState';
import { useEffect } from 'react';
interface IndexProps {
  postId: number;
}

const Index: React.FC<IndexProps> = ({ postId }) => {
  const { isOpen, setIsOpen } = usePostState();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  const handleEditingChange = (): void => {
    setIsOpen((value) => !value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleEditingChange}>
      <DialogContent className='sm:my-5'>
        <DialogHeader>
          <DialogTitle className='text-center'>EDIT POST</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='relative w-full'>
          <Post postId={postId} hasFooter={false} hasMenu={false} />

          <DialogFooter className='mt-4'>
            <Button type='submit' variant={'default'} fullWidth>
              UPDATE POST
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
