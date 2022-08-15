import { extendTheme } from '@chakra-ui/react';

import { Button } from './Button';

export const ColorTheme = extendTheme({
  colors: {
    primary: '#F49320',
  },
  shadows: {
    soft: '0px 3px 8px rgba(51, 51, 51, 0.15)',
  },
  styles: {
    global: {
      body: {
        color: '#333',
        fontFamily: 'Overpass, sans-serif',
        background: 'linear-gradient(135deg, #FFFFFF 20%, #F0F0F0 100%)',
        backgroundAttachment: 'fixed',
      },
    },
  },
  components: {
    Button,
  },
});
