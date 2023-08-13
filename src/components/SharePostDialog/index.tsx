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
import React, { useState, useRef } from 'react';

interface IndexProps {
  postId: number;
  children: React.ReactNode;
}

const Index: React.FC<IndexProps> = ({ children, postId }) => {
  const [open, setOpen] = useState(false);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(postId);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:my-5'>
        <DialogHeader>
          <DialogTitle className='text-center'>SHARE POST</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='mt-3'>
            <Textarea
              ref={textRef}
              className='text-base min-h-[120px]'
              placeholder='Type your post text here.'
              name='text'
            />
          </div>

          <DialogFooter>
            <Button type='submit' variant={'default'} loading={false} fullWidth>
              SAHRE
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
