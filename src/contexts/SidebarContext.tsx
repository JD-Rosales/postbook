import { createContext, useState } from 'react';
import { SidebarContextType, SidebarType } from '@src/types/sidebar';

export const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsOpen: () => {},
});

type SidebarProviderProps = {
  children: React.ReactNode;
};

const SidebarContextProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState<SidebarType>(true);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
