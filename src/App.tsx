import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ModalsProvider } from '@mantine/modals';


import { StoreRoutes } from 'routers/store.routes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ModalsProvider >
          <BrowserRouter>
            <Notifications position="bottom-right" />
            <StoreRoutes />
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
