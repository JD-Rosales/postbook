import useSidebar from '@src/contextsHooks/useSidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import {
  ArrowRightToLine,
  ArrowLeftToLine,
  Menu,
  User,
  LogOut,
} from 'lucide-react';
import { useGetProfile } from '@src/hooks/useProfile';
import { parseJwtId } from '@lib/utils';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const { setToggled, setCollapsed, collapsed } = useSidebar();
  const userProfile = useGetProfile(parseJwtId()?.toString() ?? '');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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

      <div className='ml-auto mr-2'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <div className='bg-slate-300 p-[2px] rounded-full cursor-pointer'>
              <Avatar className='text-sm h-[47px] w-[47px]'>
                <AvatarImage
                  src={userProfile.data?.data.profile?.profilePhoto}
                />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={2}
            className='w-[220px] absolute -right-5'
          >
            <DropdownMenuLabel>
              <p className='truncate'>{userProfile.data?.data.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  navigate('/user/' + userProfile.data?.data.id);
                }}
              >
                <User className='mr-2 h-4 w-4' />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Index;
