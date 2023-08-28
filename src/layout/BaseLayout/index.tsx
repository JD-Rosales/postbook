import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

const Index: React.FC = () => {
  return (
    <>
      <Navbar className='h-16' />

      <div className='flex bg-[#F2F3F6]'>
        <Sidebar />
        <div className='h-[calc(100vh-4rem)] flex-grow overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Index;
