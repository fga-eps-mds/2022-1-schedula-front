import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

import { Button } from './Button';

export const ColorTheme = extendTheme({
  ...baseTheme,
  colors: {
    primary: '#F49320',
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  shadows: {
    soft: '0px 3px 8px rgba(51, 51, 51, 0.15)',
  },
  styles: {
    global: {
      body: {
        color: '#333',
        background: 'linear-gradient(135deg, #FFFFFF 20%, #F0F0F0 100%)',
        backgroundAttachment: 'fixed',
      },
    },
  },
  components: {
    Button,
  },
});
