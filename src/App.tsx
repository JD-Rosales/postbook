import Router from './routes/router';
import { lazy } from 'react';

const PostDialogs = lazy(() => import('@components/PostDialogs/index'));

function App() {
  return (
    <div className='App'>
      {Router()}
      <PostDialogs />
    </div>
  );
}

export default App;
