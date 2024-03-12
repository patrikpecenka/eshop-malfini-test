import "./index.css";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/App'
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { ModalsProvider } from '@mantine/modals';
import { MantineProvider, createTheme } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider >
          <BrowserRouter >
            <QueryParamProvider adapter={ReactRouter6Adapter}>
              <Notifications position="bottom-right" />
              <App />
            </QueryParamProvider>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
