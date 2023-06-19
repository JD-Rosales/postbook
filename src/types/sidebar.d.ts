export type SidebarType = boolean;

export type SidebarContextType = {
  isOpen: SidebarType;
  setIsOpen: React.Dispatch<React.SetStateAction<SidebarType>>;
};
