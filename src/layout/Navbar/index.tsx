import { Link } from 'react-router-dom';
import { Separator } from '@ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useGetProfile } from '@src/hooks/useProfile';
import { parseJwtId } from '@lib/utils';
import { useContext } from 'react';
import { AuthContext } from '@src/contexts/AuthContext';
import menuItems from './menuItems';

const Index: React.FC = () => {
  const userProfile = useGetProfile(parseJwtId().toString());
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      <aside className='fixed bottom-0 w-full h-20 md:left-0 md:h-screen md:w-64 z-40 bg-blue-950 text-white'>
        <div className='px-4'>
          <div className='py-5 ps-3 flex flex-row md:flex-column'>
            <Avatar className='text-black'>
              <AvatarImage
                src={userProfile.data?.data?.profile?.profilePhoto}
              />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>

            <span className='px-2 leading-10 truncate'>
              {userProfile.isSuccess &&
                (userProfile.data?.data?.profile
                  ? `${userProfile.data?.data?.profile.firstName} 
                    ${userProfile.data?.data?.profile.middleName} 
                    ${userProfile.data?.data?.profile.lastName}`
                  : userProfile.data.data?.email)}
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
              <Link to={`user/${parseJwtId()}`}>PROFILE</Link>
            </li>
            <li>
              <button onClick={handleLogout}>LOGOUT</button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Index;
