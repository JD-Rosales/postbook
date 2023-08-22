import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@ui/alert-dialog';
import usePostDialog from '@src/contextsHooks/usePostDialog';
import { useDeletePost } from '@src/hooks/usePost';

interface DeleteDialogProps {
  postId: number;
}

const Index: React.FC<DeleteDialogProps> = ({ postId }) => {
  const deletePost = useDeletePost();
  const { isOpen, setIsOpen } = usePostDialog();

  const handleDelete = () => {
    deletePost.mutate({ postId });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='mt-0' onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Index;
