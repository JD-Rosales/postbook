import { useEffect, useState } from 'react';
import { PostStateContext, initialValue, PostStateType } from './Context';

interface PostStateProviderProps {
  children: React.ReactNode;
}

const PostStateProvider: React.FC<PostStateProviderProps> = ({ children }) => {
  const [postState, setPostState] = useState<PostStateType | undefined>(
    initialValue.postState
  );
  const [isOpen, setIsOpen] = useState<typeof initialValue.isOpen>(
    initialValue.isOpen
  );

  const resetState = () => {
    setPostState(initialValue.postState);
    setIsOpen(initialValue.isOpen);
  };

  const handleDialogOpen = ({ postId, type }: PostStateType): void => {
    setPostState({ postId, type });
    setIsOpen(true);
  };

  // reset state when dialog close
  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  return (
    <PostStateContext.Provider
      value={{
        postState,
        isOpen,
        setIsOpen,
        setPostState,
        handleDialogOpen,
      }}
    >
      {children}
    </PostStateContext.Provider>
  );
};

export default PostStateProvider;
