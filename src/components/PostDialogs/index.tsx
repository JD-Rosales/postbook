import usePostDialog from '@src/contextsHooks/usePostDialog';
import UpdateDialog from './UpdateDialog';
import ShareDialog from './ShareDialog';
import DeleteDialog from './DeleteDialog';
import CreateDialog from './CreateDialog';

// This component render dialogs from the PostStateProvider
const Index = () => {
  const { dialogState, isOpen } = usePostDialog();
  return (
    <>
      {dialogState?.type === 'update' && isOpen ? (
        <UpdateDialog postId={dialogState.id} />
      ) : dialogState?.type === 'share' && isOpen ? (
        <ShareDialog postId={dialogState.id} />
      ) : dialogState?.type === 'delete' && isOpen ? (
        <DeleteDialog postId={dialogState.id} />
      ) : dialogState?.type === 'create' ? (
        <CreateDialog />
      ) : (
        ''
      )}
    </>
  );
};

export default Index;
