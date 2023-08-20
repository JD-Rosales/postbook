/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

interface SidebarContextType {
  toggled: boolean;
  collapsed: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const initialValue = {
  toggled: false,
  collapsed: false,
};

export const SidebarContext = createContext<SidebarContextType>({
  ...initialValue,
  setToggled: () => {},
  setCollapsed: () => {},
});
