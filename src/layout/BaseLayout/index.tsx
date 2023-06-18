import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const Sidebar = lazy(() => import('../Sidebar'));

const Index: React.FC = () => {
  return (
    <>
      <Sidebar />

      <div className='w-full text-center bg-slate-700'>
        <Outlet />
      </div>
    </>
  );
};

export default Index;
