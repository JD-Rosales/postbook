import { useUserFollowers } from '@src/hooks/useFollows';
import { useEffect } from 'react';

interface FollowersProps {
  id: number;
}

const Followers: React.FC<FollowersProps> = ({ id }) => {
  const followers = useUserFollowers(id);

  useEffect(() => {
    console.log('followers', followers.data?.data);
  }, [followers]);
  return <div>Followers</div>;
};

export default Followers;
