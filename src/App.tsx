import { MantineProvider, createTheme } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { ModalsProvider } from '@mantine/modals';

import { StoreRoutes } from 'routers/store.routes';

const queryClient = new QueryClient();

const theme = createTheme({
  colors: {
  },
  defaultGradient: {
    from: 'violet',
    to: 'indigo',
    deg: 25,
  }
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider >
          <BrowserRouter >
            <QueryParamProvider adapter={ReactRouter6Adapter}>
              <Notifications position="bottom-right" />
              <StoreRoutes />
            </QueryParamProvider>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
