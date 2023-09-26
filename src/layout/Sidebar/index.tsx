import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import useSidebar from '@src/context/useSidebar';
import { Home } from 'lucide-react';

const Index: React.FC = () => {
  const { toggled, setToggled, collapsed } = useSidebar();

  return (
    <div>
      <Sidebar
        className='h-screen text-white'
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
          <MenuItem icon={<Home />} component={<NavLink to='/' />}>
            HOME
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Index;
