import useSidebar from '@src/contextsHooks/useSidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { ArrowRightToLine, ArrowLeftToLine, Menu } from 'lucide-react';
import { useGetProfile } from '@src/hooks/useProfile';
import { parseJwtId } from '@lib/utils';

const Index = () => {
  const { setToggled, setCollapsed, collapsed } = useSidebar();
  const userProfile = useGetProfile(parseJwtId()?.toString() ?? '');

  return (
    <div className='flex items-center shadow-md bg-white p-2 h-16 sticky top-0 z-20'>
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

      <div className='ml-auto'>
        <Avatar className='text-sm h-[40px] w-[40px]'>
          <AvatarImage src={userProfile.data?.data.profile?.profilePhoto} />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Index;
