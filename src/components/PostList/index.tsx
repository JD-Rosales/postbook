import { usePosts } from '@src/hooks/usePost';

const Index = () => {
  const fetchPosts = usePosts();

  return (
    <div>
      {fetchPosts.data?.pages &&
        fetchPosts.data.pages.map((group, i) => {
          return (
            <div key={i}>
              {group.data.map((post) => {
                return (
                  <div key={post.id} className='mb-2'>
                    <p>Id: {post.id}</p>
                    <p>Text: {post.text}</p>
                  </div>
                );
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
