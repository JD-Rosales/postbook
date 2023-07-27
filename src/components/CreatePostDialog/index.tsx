import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@ui/dialog';

interface IndexProps {
  children: React.ReactNode;
}

const Index: React.FC<IndexProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:my-5'>
        <DialogHeader>
          <DialogTitle className='text-center'>CREATE POST</DialogTitle>
        </DialogHeader>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
