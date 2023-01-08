/* eslint-disable class-methods-use-this */
import { createStandaloneToast } from '@chakra-ui/react';

const { toast: ChakraToast } = createStandaloneToast();

class Toast {
  success(message: string, title?: string) {
    return ChakraToast({
      ...(title && { title }),
      description: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }

  error(message: string, title?: string) {
    return ChakraToast({
      ...(title && { title }),
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  warning(message: string, title?: string) {
    return ChakraToast({
      ...(title && { title }),
      description: message,
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  }
}

export const toast = new Toast();
