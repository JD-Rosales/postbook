import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

const Index: React.FC = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-grow h-screen overflow-y-auto'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
