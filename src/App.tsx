import { RouterProvider } from 'react-router-dom';
import Router from './routes/router';
import Spinner from '@components/Spinner';

function App() {
  return (
    <div className='App flex h-full w-full'>
      <RouterProvider fallbackElement={<Spinner />} router={Router()} />
    </div>
  );
}

export default App;
