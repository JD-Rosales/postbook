import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useVerifyToken } from '@src/hooks/useAuth';
import useSidebar from '@src/contextsHooks/useSidebar';

const Index: React.FC = () => {
  const verifiedUser = useVerifyToken();

  const { toggled, setToggled, collapsed } = useSidebar();

  return (
    <div>
      <Sidebar
        className='h-screen'
        breakPoint='sm'
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
                backgroundColor: 'red',
                color: 'white',
              },
            },
          }}
        >
          <MenuItem component={<Link to='/' />}> Home</MenuItem>
          <MenuItem
            component={<Link to={`user/${verifiedUser.data?.data.id}`} />}
          >
            Profile
          </MenuItem>
          <MenuItem component={<Link to='/login' />}> Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Index;
