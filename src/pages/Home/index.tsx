import styles from './home.module.css';
import PostCreateDialog from '@components/PostCreateDialog';
import PostList from '@components/PostList';
import { usePosts } from '@src/hooks/usePost';

const Index = () => {
  const fetchPosts = usePosts();
  return (
    <div className='max-w-xl mx-auto'>
      <PostList
        isLoading={fetchPosts.isLoading}
        data={fetchPosts.data?.pages}
        hasNextPage={fetchPosts.hasNextPage}
        isFetchingNextPage={fetchPosts.isFetchingNextPage}
        nextPage={fetchPosts.fetchNextPage}
      />

      <PostCreateDialog>
        <div className='fixed right-20 bottom-20'>
          <button className={styles['icon-btn'] + ' ' + styles['add-btn']}>
            <div className={styles['add-icon']}></div>
            <div className={styles['btn-txt']}>Create Post</div>
          </button>
        </div>
      </PostCreateDialog>
    </div>
  );
};

export default Index;
