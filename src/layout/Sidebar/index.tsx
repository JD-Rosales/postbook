import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { useVerifyToken } from '@src/hooks/useAuth';
import useSidebar from '@src/contextsHooks/useSidebar';
import { LayoutGrid, UserSquare } from 'lucide-react';

const Index: React.FC = () => {
  const verifiedUser = useVerifyToken();

  const { toggled, setToggled, collapsed } = useSidebar();

  return (
    <div>
      <Sidebar
        className='h-screen'
        breakPoint='md'
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        collapsed={collapsed}
        transitionDuration={500}
      >
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: 'blue',
                color: 'white',
              },
              fontSize: '18px',
            },
          }}
        >
          <MenuItem icon={<LayoutGrid />} component={<NavLink to='/' />}>
            Home
          </MenuItem>
          <MenuItem
            icon={<UserSquare />}
            component={<NavLink to={`user/${verifiedUser.data?.data.id}`} />}
          >
            Profile
          </MenuItem>
          <MenuItem component={<NavLink to='/login' />}> Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Index;
