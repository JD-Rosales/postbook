import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import useSidebar from '@src/context/useSidebar';
import { Home, UserCircle } from 'lucide-react';
import { useGetProfile } from '@src/hooks/useUser';
import { parseJwtId } from '@src/lib/utils';
import { useCallback } from 'react';

const Index: React.FC = () => {
  const { toggled, setToggled, collapsed } = useSidebar();
  const profile = useGetProfile(parseJwtId()?.toString() ?? '');

  const handleSidebarToggle = () => {
    setToggled((prev) => !prev);
  };

  const nameRenderer = useCallback((): string => {
    if (profile.data?.data.profile) {
      return `${profile.data.data.profile.firstName} ${profile.data.data.profile.middleName} ${profile.data.data.profile.lastName}`;
    } else if (profile.data?.data.email) {
      return `${profile.data.data.email}`;
    } else return ``;
  }, [profile.data]);

  return (
    <Sidebar
      className='h-full text-white'
      breakPoint='md'
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      collapsed={collapsed}
      transitionDuration={500}
      // backgroundColor='#F2F3F6'
      backgroundColor='#13395e'
    >
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: '#1e5288',
              color: 'primary',
            },
            [`:hover`]: {
              backgroundColor: '#1e5288',
              color: '',
            },
          },
        }}
      >
        <MenuItem
          icon={<UserCircle />}
          component={<NavLink to={`/user/${parseJwtId()?.toString() ?? ''}`} />}
          onClick={handleSidebarToggle}
        >
          {nameRenderer()}
        </MenuItem>

        <MenuItem
          icon={<Home />}
          component={<NavLink to='/' />}
          onClick={handleSidebarToggle}
        >
          Home
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Index;
