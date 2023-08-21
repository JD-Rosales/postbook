import { SidebarContext, initialValue } from './Context';
import { useState } from 'react';

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [toggled, setToggled] = useState(initialValue.toggled);
  const [collapsed, setCollapsed] = useState(initialValue.collapsed);

  return (
    <SidebarContext.Provider
      value={{ toggled, setToggled, collapsed, setCollapsed }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
