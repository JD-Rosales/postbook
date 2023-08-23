import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import useSidebar from '@src/contextsHooks/useSidebar';
import { BadgePlus, Webhook } from 'lucide-react';
import usePostDialog from '@src/contextsHooks/usePostDialog';

const Index: React.FC = () => {
  const { toggled, setToggled, collapsed } = useSidebar();
  const { handleDialog } = usePostDialog();

  return (
    <div>
      <Sidebar
        className='h-screen text-white'
        breakPoint='md'
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        collapsed={collapsed}
        transitionDuration={500}
        backgroundColor='#13395e'
      >
        <Menu
          menuItemStyles={{
            button: {
              height: '65px',
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
          <MenuItem icon={<Webhook size={35} />} component={<NavLink to='/' />}>
            POSTBOOK
          </MenuItem>
        </Menu>

        <Menu
          menuItemStyles={{
            button: {
              [`:hover`]: {
                backgroundColor: '#1e5288',
                color: '',
              },
              fontSize: '18px',
            },
          }}
        >
          <div className='pt-[50px] pb-[5px] pl-4'>
            {!collapsed && (
              <p className='font-semibold text-gray-300'>Actions</p>
            )}
          </div>
          <MenuItem
            icon={<BadgePlus />}
            onClick={() => {
              handleDialog({ id: 0, type: 'create' });
            }}
          >
            Create Post
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Index;
