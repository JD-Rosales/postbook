import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@ui/dialog';
import { Button } from '@ui/button';
import { Progress } from '@ui/progress';
import Post from '@components/Post';
import { useGetPost } from '@src/hooks/usePost';
import usePostDialog from '@src/contextsHooks/usePostDialog';
import { useFileUpload } from '@src/hooks/useFileUpload';
import { useUpdatePost } from '@src/hooks/usePost';
import { useToast } from '@ui/use-toast';
import { useEffect } from 'react';

interface IndexProps {
  postId: number;
}

const Index: React.FC<IndexProps> = ({ postId }) => {
  const { toast } = useToast();
  const post = useGetPost(postId);
  const { isOpen, setIsOpen, dialogData } = usePostDialog();
  const fileUpload = useFileUpload(1);
  const postUpdate = useUpdatePost();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data = { ...dialogData, photoPublicId: undefined, postId };

    // start uploading photo if photo is modified on submit
    if (post.data?.data.photo !== dialogData.photo && dialogData.photo) {
      const response = await fileUpload.mutateAsync(dialogData.photo);
      data = { ...data, photo: response.data.secure_url };
      data = { ...data, photoPublicId: response.data.public_id };
    }

    postUpdate.mutate(data);
  };

  useEffect(() => {
    if (postUpdate.isSuccess && !postUpdate.isError) {
      setIsOpen(false);
      fileUpload.reset();
      toast({
        variant: 'success',
        title: 'Sucess!',
        description: 'Post updated successfully',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postUpdate]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:my-5'>
        <DialogHeader>
          <DialogTitle className='text-center'>EDIT POST</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='relative w-full'>
          <Post postId={postId} />

          {fileUpload.isLoading && (
            <Progress
              value={fileUpload.progress}
              className='w-full mt-3 mb-2 h-3'
            />
          )}

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
