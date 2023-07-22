import { Link } from 'react-router-dom';
import { Separator } from '@ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import menuItems from './menuItems';
import { useGetProfile } from '@src/hooks/useAuth';
import { parseJwt } from '@lib/utils';
// import { useContext } from 'react';
// import { SidebarContext } from '@src/contexts/SidebarContext';

const Index: React.FC = () => {
  const userProfile = useGetProfile(parseJwt());
  // const userProfile = useGetProfile(id ? parseInt(id) : 0);
  // const { isOpen } = useContext(SidebarContext);

  return (
    <>
      <aside className='fixed bottom-0 w-full h-20 md:left-0 md:h-screen md:w-64 z-40 bg-primary text-white'>
        <div className='px-4'>
          <div className='py-5 ps-3 flex flex-row md:flex-column'>
            <Avatar className='text-black'>
              <AvatarImage />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>

            <span className='px-2 leading-10 truncate'>
              {userProfile.isSuccess &&
                (userProfile.data?.data?.email
                  ? userProfile.data.data?.email
                  : `${userProfile.data?.data?.firstName} 
                    ${userProfile.data?.data?.middleName} 
                    ${userProfile.data?.data?.lastName}`)}
            </span>
          </div>
          <Separator />

          <ul>
            {menuItems.map((item, i) => {
              return (
                <li key={i}>
                  <Link to={item.url}>{item.title}</Link>
                </li>
              );
            })}
            <li>
              <Link to={`user/${parseJwt()}`}>PROFILE</Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Index;
