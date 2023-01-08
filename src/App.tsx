import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';

import { router } from './config/routes/Routes';

const { ToastContainer } = createStandaloneToast();

const queryClient = new QueryClient();

export function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
