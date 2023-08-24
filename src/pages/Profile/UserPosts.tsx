import { useUserPosts } from '@src/hooks/usePost';
import PostList from '@src/components/PostList';

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
      />
    </div>
  );
};

export default UserPosts;
