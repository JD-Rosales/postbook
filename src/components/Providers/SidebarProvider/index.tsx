import { SidebarContext, initialValue } from './Context';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const [toggled, setToggled] = useState(initialValue.toggled);
  const [collapsed, setCollapsed] = useState(initialValue.collapsed);

  useEffect(() => {
    if (isDesktop) {
      setCollapsed(false);
    }
  }, [isDesktop]);

  return (
    <SidebarContext.Provider
      value={{ toggled, setToggled, collapsed, setCollapsed }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
