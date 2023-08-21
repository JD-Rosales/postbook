import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@ui/dialog';
import { Button } from '@ui/button';
import { useGetPost } from '@src/hooks/usePost';
import Post from '@components/Post';
import PostLoader from '@components/Loader/PostLoader';
import usePostState from '@src/contextsHooks/usePostState';
import { useEffect } from 'react';
interface IndexProps {
  postId: number;
}

const Index: React.FC<IndexProps> = ({ postId }) => {
  const { postState, isEditing, setIsEditing } = usePostState();

  // isEditing handles the query to fetch only when dialog is mounted
  const getPost = useGetPost(postId, isEditing);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  const handleEditingChange = (): void => {
    setIsEditing((value) => !value);
  };

  return (
    <Dialog open={isEditing} onOpenChange={handleEditingChange}>
      <DialogContent className='sm:my-5'>
        <DialogHeader>
          <DialogTitle className='text-center'>EDIT POST</DialogTitle>
        </DialogHeader>
        <div className='bg-slate-400'>{postState.text}</div>
        {getPost.isLoading ? (
          <PostLoader hasFooter={false} />
        ) : (
          <form onSubmit={handleSubmit} className='relative w-full'>
            {/* <Post
              data={getPost.data?.data}
              hasFooter={false}
              hasMenu={false}
              postEditable={true}
            /> */}
            {getPost.data?.data && <Post data={getPost.data.data} />}

            <DialogFooter className='mt-4'>
              <Button type='submit' variant={'default'} fullWidth>
                UPDATE POST
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Index;
