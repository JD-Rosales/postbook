import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@ui/dialog';
import Content from './Content';

type IndexProps = {
  children: React.ReactNode;
  postId: number;
  originPostId?: number | null;
};

const Index: React.FC<IndexProps> = ({ children, postId, originPostId }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='px-2 md:px-4 md:my-4 pb-1 max-w-xl'>
        <DialogHeader>
          <DialogTitle className='text-center mb-1 text-xl text-gray-700'>
            Share post
          </DialogTitle>
        </DialogHeader>
        <Content
          postId={postId}
          originPostId={originPostId}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Index;
