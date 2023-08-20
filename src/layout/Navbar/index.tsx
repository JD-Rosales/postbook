import useSidebar from '@src/contextsHooks/useSidebar';
import { ArrowRightToLine, ArrowLeftToLine, Menu } from 'lucide-react';

const Index = () => {
  const { setToggled, setCollapsed, collapsed } = useSidebar();
  return (
    <div className='flex items-center shadow-md bg-white py-2 h-16 sticky top-0 z-20'>
      <button
        className='md:hidden ml-2 text-slate-600 p-2'
        onClick={() => setToggled((prev) => !prev)}
      >
        <Menu size={30} />
      </button>

      <button
        className='hidden md:block ml-2 text-slate-600 p-2'
        onClick={() => setCollapsed((prev) => !prev)}
      >
        {collapsed ? <ArrowRightToLine /> : <ArrowLeftToLine />}
      </button>
    </div>
  );
};

export default Index;
