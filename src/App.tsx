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
    "btn-violet": [
      "#f6ecff",
      "#e7d6fb",
      "#caabf1",
      "#ac7ce8",
      "#9354e0",
      "#833cdb",
      "#7b2eda",
      "#6921c2",
      "#5d1cae",
      "#501599"
    ],
    "btn-indigo": [
      "#eef3ff",
      "#dee2f2",
      "#bdc2de",
      "#98a0ca",
      "#7a84ba",
      "#6672b0",
      "#5c68ac",
      "#4c5897",
      "#424e88",
      "#364379"
    ]
  },
  defaultGradient: {
    from: 'btn-violet',
    to: 'btn-indigo',
    deg: 45,
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
