import "./index.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { ModalsProvider } from '@mantine/modals';
import { MantineProvider, createTheme } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadingPage } from "pages/LoadingPage";

const App = lazy(() => import('./App'));

const queryClient = new QueryClient();

const theme = createTheme({
  defaultGradient: {
    from: "violet",
    to: "indigo",
    deg: 25
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <MantineProvider theme={theme}>
        <ModalsProvider >
          <BrowserRouter >
            <Suspense fallback={<LoadingPage />}>
              <QueryParamProvider adapter={ReactRouter6Adapter}>
                <Notifications position="bottom-right" />
                <App />
              </QueryParamProvider>
            </Suspense>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
