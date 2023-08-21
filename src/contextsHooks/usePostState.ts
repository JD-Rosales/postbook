import { useContext } from 'react';
import { PostStateContext } from '@components/Providers/PostStateProvider/Context';

const usePostState = () => {
  const context = useContext(PostStateContext);

  if (!context) throw new Error('Context must be used within a Provider');

  return { ...context };
};

export default usePostState;
