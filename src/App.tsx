import { RouterProvider } from 'react-router-dom';
import Router from './routes/router';
import Spinner from '@components/Spinner';

function App() {
  return (
    <>
      <RouterProvider fallbackElement={<Spinner />} router={Router()} />
    </>
  );
}

export default App;
