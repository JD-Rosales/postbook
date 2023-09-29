import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@ui/dialog';
import { Suspense, lazy, useState } from 'react';

const Content = lazy(() => import('./Content'));

export default function EditProfileDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='px-2 md:px-4 md:my-4 pb-1 max-w-xl'>
        <DialogHeader>
          <DialogTitle className='text-center -mt-2 mb-1 text-xl text-gray-700'>
            Edit profile
          </DialogTitle>
        </DialogHeader>

        <Suspense fallback={<div className=''>Please wait...</div>}>
          <Content setOpen={setOpen} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
