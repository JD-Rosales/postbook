import usePostDialog from '@src/contextsHooks/usePostDialog';
import { lazy, Suspense } from 'react';

const UpdateDialog = lazy(() => import('@components/PostDialogs/UpdateDialog'));
const ShareDialog = lazy(() => import('@components/PostDialogs/ShareDialog'));

// This component render dialogs from the PostStateProvider
const Index = () => {
  const { dialogState, isOpen } = usePostDialog();
  return (
    <>
      <Suspense
        fallback={
          <div className='h-screen w-screen bg-black'>
            Loading............................
          </div>
        }
      >
        {dialogState?.type === 'update' && isOpen ? (
          <UpdateDialog postId={dialogState.id} />
        ) : dialogState?.type === 'share' && isOpen ? (
          <ShareDialog postId={dialogState.id} />
        ) : (
          ''
        )}
      </Suspense>
    </>
  );
};

export default Index;
