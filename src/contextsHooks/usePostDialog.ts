import { useContext } from 'react';
import { PostDialogContext } from '@src/components/Providers/PostDialogProvider/Context';

const usePostDialog = () => {
  const context = useContext(PostDialogContext);

  if (!context) throw new Error('Context must be used within a Provider');

  return { ...context };
};

export default usePostDialog;
