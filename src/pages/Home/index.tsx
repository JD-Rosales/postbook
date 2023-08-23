// import styles from './home.module.css';
import ContainerXl from '@components/ContainerXl';
import PostList from '@components/PostList';
import CreatePost from '@components/CreatePost';
import { usePosts } from '@src/hooks/usePost';

const Index = () => {
  const fetchPosts = usePosts();
  return (
    <ContainerXl>
      <CreatePost />

      <PostList
        isLoading={fetchPosts.isLoading}
        data={fetchPosts.data?.pages}
        hasNextPage={fetchPosts.hasNextPage}
        isFetchingNextPage={fetchPosts.isFetchingNextPage}
        nextPage={fetchPosts.fetchNextPage}
      />
    </ContainerXl>
  );
};

export default Index;
