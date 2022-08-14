import type { ComponentStyleConfig } from '@chakra-ui/theme';

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
export const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {},
  // Two sizes: sm and md
  sizes: {},
  // Two variants: outline and solid
  variants: {
    primary: {
      color: '#F4F7F5',
      backgroundColor: 'primary',
      boxShadow: 'soft',

      backgroundImage:
        'linear-gradient(to right, #FF8008 0%, #FFA03A 51%, #FF8008 100%);',
      transition: '0.5s',
      backgroundSize: '200% auto',

      _hover: {
        backgroundPosition:
          'right center' /* change the direction of the change here */,
        textDecoration: 'none',

        _disabled: {
          background: '',
        },
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};
