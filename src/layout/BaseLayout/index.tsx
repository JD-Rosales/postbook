import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

const Index: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className='flex bg-[#F2F3F6]'>
        <Sidebar />
        <div className='flex-grow h-screen overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Index;
