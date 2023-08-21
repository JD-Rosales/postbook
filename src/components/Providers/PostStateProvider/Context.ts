/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export type postStateType = {
  postId?: number;
  text?: string;
  photo?: string;
  authorId?: number;
};

type PostStateContextType = {
  postState: postStateType;
  isEditing: boolean;
  setPostState: React.Dispatch<React.SetStateAction<postStateType>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  resetState: () => void;
};

export const initialValue = {
  postState: {
    postId: undefined,
    text: undefined,
    photo: undefined,
    authorId: undefined,
  },
  isEditing: false,
};

export const PostStateContext = createContext<PostStateContextType>({
  postState: initialValue.postState,
  isEditing: initialValue.isEditing,
  setPostState: () => {},
  setIsEditing: () => {},
  resetState: () => {},
});
