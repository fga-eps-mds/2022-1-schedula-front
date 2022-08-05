import { extendTheme } from '@chakra-ui/react';

export const ColorTheme = extendTheme({
  colors: {
    primary: '#F49320', // Laranja dos botões */
  },
  shadows: {
    soft: '0px 3px 12px rgba(51, 51, 51, 0.25)',
  },
  styles: {
    global: {
      fontFamily: {
        color: '#333',
      },
    },
  },
});
