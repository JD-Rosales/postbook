import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import useSidebar from '@src/context/useSidebar';
import { Home, UserCircle } from 'lucide-react';
import { useGetProfile } from '@src/hooks/useUser';
import { useUserFollowers } from '@src/hooks/useFollows';
import { parseJwtId } from '@src/lib/utils';
import { useCallback } from 'react';
import MyFollowers from '@src/components/MyFollowers';

const Index: React.FC = () => {
  const { toggled, setToggled, collapsed } = useSidebar();
  const profile = useGetProfile(parseJwtId()?.toString() ?? '');
  const userFollowers = useUserFollowers(parseJwtId()?.toString() ?? '');

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
      className='h-screen text-white'
      breakPoint='md'
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      collapsed={collapsed}
      transitionDuration={500}
      // backgroundColor='#F2F3F6'
      // backgroundColor='#13395e'
    >
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: 'rgba(226, 232, 240, 0.8)',
            },
            [`:hover`]: {
              backgroundColor: 'rgba(226, 232, 240, 0.8)',
            },
            color: 'rgba(31, 41, 55, 0.8)',
            borderRadius: '.5rem',
            transition: 'all 0.3s ease',
          },
        }}
      >
        <MenuItem
          icon={<UserCircle className='text-gray-500' />}
          component={<NavLink to={`/user/${parseJwtId()?.toString() ?? ''}`} />}
          onClick={handleSidebarToggle}
        >
          {nameRenderer()}
        </MenuItem>

        <MenuItem
          icon={<Home className='text-gray-500' />}
          component={<NavLink to='/' />}
          onClick={handleSidebarToggle}
        >
          Home
        </MenuItem>
      </Menu>

      <span className='block px-4 mt-4 text-slate-500'>My Followers</span>

      <div className='max-h-[350px] overflow-y-auto pt-2'>
        {!userFollowers.data
          ? ''
          : userFollowers.data.data.map((follower, i) => (
              <MyFollowers data={follower} key={i} />
            ))}
      </div>
    </Sidebar>
  );
};

export default Index;
