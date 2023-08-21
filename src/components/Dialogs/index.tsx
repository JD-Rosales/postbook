import PostUpdateDialog from '@components/PostUpdateDialog';
import usePostState from '@src/contextsHooks/usePostState';

// This component render dialogs from the PostStateProvider
const Index = () => {
  const { postState, isOpen } = usePostState();
  return (
    <>{postState && isOpen && <PostUpdateDialog postId={postState.postId} />}</>
  );
};

export default Index;
