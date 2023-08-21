import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import SidebarProvider from '@components/Providers/SidebarProvider';
import PostStateProvider from '@src/components/Providers/PostStateProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import Dialogs from '@components/Dialogs';
import { Toaster } from '@ui/toaster';
import Spinner from '@components/Spinner';

import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner />}>
        <SidebarProvider>
          <PostStateProvider>
            <App />
            <Dialogs />
            <Toaster />
          </PostStateProvider>
        </SidebarProvider>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
