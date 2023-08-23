import { SidebarContext, initialValue } from './Context';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [toggled, setToggled] = useState(initialValue.toggled);
  const [collapsed, setCollapsed] = useState(initialValue.collapsed);

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  useEffect(() => {
    if (isMobile) {
      setCollapsed(false);
    }
  }, [isMobile]);

  return (
    <SidebarContext.Provider
      value={{ toggled, setToggled, collapsed, setCollapsed }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
