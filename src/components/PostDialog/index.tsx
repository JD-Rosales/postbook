import { useState } from 'react';
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

interface IndexProps {
  children: React.ReactNode;
}

const Index: React.FC<IndexProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    text: '',
    photo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('submitted');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <form onSubmit={handleSubmit}>
        <DialogContent className='sm:my-5'>
          <DialogHeader>
            <DialogTitle className='text-center'>CREATE POST</DialogTitle>
          </DialogHeader>

          <div className='mt-3'>
            <Textarea
              className='text-base'
              placeholder='Type your post text here.'
              name='text'
              onChange={handleChange}
              value={formData.text}
            />
          </div>

          <DialogFooter>
            <Button variant={'default'} fullWidth>
              POST
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default Index;
