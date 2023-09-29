import useSidebar from '@src/context/useSidebar';
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
import { Menu, User, LogOut } from 'lucide-react';
import { useGetProfile } from '@src/hooks/useUser';
import { parseJwtId, cn } from '@lib/utils';
import { useNavigate } from 'react-router-dom';
import Search from '@components/Search';

type NavbarProps = {
  className?: string;
};

const Index: React.FC<NavbarProps> = ({ className }) => {
  const navigate = useNavigate();
  const { setToggled } = useSidebar();
  const userProfile = useGetProfile(parseJwtId()?.toString() ?? '');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 shadow-md bg-white p-2 h-16 w-full fixed top-0 z-20',
        className
      )}
    >
      <button
        className='md:hidden ml-2 text-slate-600 p-2'
        onClick={() => setToggled((prev) => !prev)}
      >
        <Menu size={30} />
      </button>

      <Search />

      {/* <button onClick={() => setCollapsed((prev) => !prev)}>Toggle</button> */}

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
