import { useEffect, useState } from 'react';
import {
  PostDialogContext,
  initialValue,
  DialogStateType,
  DialogDataType,
} from './Context';

interface PostStateProviderProps {
  children: React.ReactNode;
}

const PostStateProvider: React.FC<PostStateProviderProps> = ({ children }) => {
  const [dialogState, setDialogState] = useState<DialogStateType | undefined>(
    initialValue.dialogState
  );
  const [dialogData, setDialogData] = useState<DialogDataType>(
    initialValue.data
  );
  const [isOpen, setIsOpen] = useState<typeof initialValue.isOpen>(
    initialValue.isOpen
  );

  const resetState = () => {
    setDialogState(initialValue.dialogState);
    setDialogData(initialValue.data);
    setIsOpen(initialValue.isOpen);
  };

  const handleDialog = ({ id, type }: DialogStateType): void => {
    setDialogState({ id, type });
    setIsOpen(true);
  };

  // reset state when dialog close
  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  return (
    <PostDialogContext.Provider
      value={{
        dialogState,
        dialogData,
        isOpen,
        setDialogData,
        setIsOpen,
        setDialogState,
        handleDialog,
      }}
    >
      {children}
    </PostDialogContext.Provider>
  );
};

export default PostStateProvider;
