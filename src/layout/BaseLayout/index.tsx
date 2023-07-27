import { Outlet } from 'react-router-dom';
import Sidebar from '../Navbar';

const Index: React.FC = () => {
  return (
    <div className='pb-20 md:pb-0 md:pl-64'>
      <Sidebar />

      <div className='px-2 relative'>
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
