/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export type DialogStateType = {
  id: number;
  type: 'create' | 'update' | 'share' | 'delete';
};

export type DialogDataType = {
  text: string;
  photo: string;
};

type PostDialogContextType = {
  dialogState?: DialogStateType;
  dialogData: DialogDataType;
  isOpen: boolean;
  setDialogState: React.Dispatch<
    React.SetStateAction<DialogStateType | undefined>
  >;
  setDialogData: React.Dispatch<React.SetStateAction<DialogDataType>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDialog: ({ id, type }: DialogStateType) => void;
};

export const initialValue = {
  dialogState: undefined,
  data: {
    text: '',
    photo: '',
  },
  isOpen: false,
};

export const PostDialogContext = createContext<PostDialogContextType>({
  dialogState: initialValue.dialogState,
  dialogData: initialValue.data,
  isOpen: initialValue.isOpen,
  setDialogState: () => {},
  setDialogData: () => {},
  setIsOpen: () => {},
  handleDialog: () => {},
});
