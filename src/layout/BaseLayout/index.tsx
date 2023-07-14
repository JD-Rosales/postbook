import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarContextProvider from '@src/contexts/SidebarContext';

const Sidebar = lazy(() => import('../Sidebar'));

const Index: React.FC = () => {
  return (
    <>
      <SidebarContextProvider>
        <Sidebar />

        <div className='p-4'>
          <Outlet />
        </div>
      </SidebarContextProvider>
    </>
  );
};

export default Index;
