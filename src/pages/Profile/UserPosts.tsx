import { useUserPosts } from '@src/hooks/usePost';
import PostList from '@src/components/PostList';
import { parseJwtId } from '@src/lib/utils';

type UserPostsProps = {
  id: string;
};

const UserPosts: React.FC<UserPostsProps> = ({ id }) => {
  const userPosts = useUserPosts(id);
  return (
    <div>
      <PostList
        data={userPosts.data?.pages}
        isLoading={userPosts.isLoading}
        isFetchingNextPage={userPosts.isFetchingNextPage}
        hasNextPage={userPosts.hasNextPage}
        nextPage={userPosts.fetchNextPage}
        hasMenu={parseJwtId()?.toString() === id ? true : false}
      />
    </div>
  );
};

export default UserPosts;
