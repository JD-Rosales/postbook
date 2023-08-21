/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export type PostStateType = {
  postId: number;
  type: 'create' | 'update' | 'share' | 'delete';
};

type PostStateContextType = {
  postState?: PostStateType;
  isOpen: boolean;
  setPostState: React.Dispatch<React.SetStateAction<PostStateType | undefined>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDialogOpen: ({ postId, type }: PostStateType) => void;
};

export const initialValue = {
  postState: undefined,
  isOpen: false,
};

export const PostStateContext = createContext<PostStateContextType>({
  postState: initialValue.postState,
  isOpen: initialValue.isOpen,
  setPostState: () => {},
  setIsOpen: () => {},
  handleDialogOpen: () => {},
});
