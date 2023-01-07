import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';

import { router } from './config/routes/Routes';

export function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
