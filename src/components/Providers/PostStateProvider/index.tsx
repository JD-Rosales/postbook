import { useState } from 'react';
import { PostStateContext, initialValue, postStateType } from './Context';

interface PostStateProviderProps {
  children: React.ReactNode;
}

const SidebarProvider: React.FC<PostStateProviderProps> = ({ children }) => {
  const [postState, setPostState] = useState<postStateType>(
    initialValue.postState
  );
  const [isEditing, setIsEditing] = useState(initialValue.isEditing);

  const resetState = () => {
    setPostState(initialValue.postState);
    setIsEditing(initialValue.isEditing);
  };

  return (
    <PostStateContext.Provider
      value={{
        postState,
        isEditing,
        setIsEditing,
        setPostState,
        resetState,
      }}
    >
      {children}
    </PostStateContext.Provider>
  );
};

export default SidebarProvider;
