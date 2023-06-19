import { useContext } from 'react';
import { SidebarContext } from '@src/contexts/SidebarContext';
import { Button } from '@ui/button';
const Index = () => {
  const sidebar = useContext(SidebarContext);
  return (
    <div className=''>
      <h1>You are Authenticated!</h1>
      <br />

      <Button
        className='mt-0'
        variant={'default'}
        onClick={() => {
          sidebar.setIsOpen((prevState) => !prevState);
        }}
      >
        Sidebar Toggler
      </Button>
    </div>
  );
};

export default Index;
