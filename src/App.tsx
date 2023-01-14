import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '@/styles/theme';

import { AuthProvider } from '@/contexts/AuthContext';

import '@/styles/react-datepicker.scss';
import { Router } from '@/config/routes/Routes';

const { ToastContainer } = createStandaloneToast();

const queryClient = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider resetCSS theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Router />
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
