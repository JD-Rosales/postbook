import { Outlet } from 'react-router-dom';
import SidebarContextProvider from '@src/contexts/SidebarContext';
import Sidebar from '../Navbar';

const Index: React.FC = () => {
  return (
    <>
      <SidebarContextProvider>
        <div className='pb-20 md:pb-0 md:pl-64'>
          <Sidebar />

          <div className='p-2'>
            <Outlet />
          </div>
        </div>
      </SidebarContextProvider>
    </>
  );
};

export default Index;
