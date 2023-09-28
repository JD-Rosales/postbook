import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import useSidebar from '@src/context/useSidebar';

const Index: React.FC = () => {
  const { collapsed } = useSidebar();
  return (
    <>
      <Navbar className='h-16' />
      <div className='relative flex min-h-screen pt-16 bg-[#F2F3F6]'>
        <div className='md:fixed h-full'>
          <Sidebar />
        </div>

        <div
          className={`flex-1 ${
            collapsed ? 'md:ml-[80px]' : 'md:ml-[250px]'
          } transition-all duration-500 ease-in-out `}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Index;
