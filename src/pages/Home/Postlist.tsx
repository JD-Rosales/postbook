import { usePosts } from '@src/hooks/usePost';
import Post from '@components/Post';
import { useEffect } from 'react';

const Index = () => {
  const fetchPosts = usePosts();

  useEffect(() => {
    if (fetchPosts.data) {
      console.log(fetchPosts.data.pages);
    }
  }, [fetchPosts]);

  return (
    <div>
      {fetchPosts.data?.pages &&
        fetchPosts.data.pages.map((group, i) => {
          return (
            <div key={i}>
              {group.data.map((post) => {
                return <Post data={post} key={post.id} />;
              })}
            </div>
          );
        })}

      <button
        onClick={() => {
          fetchPosts.fetchNextPage();
        }}
      >
        Next Page
      </button>
    </div>
  );
};

export default Index;
