/* eslint-disable react/prop-types */
import { Checkbox, Flex } from '@chakra-ui/react';
import {
  chakraComponents,
  ChakraStylesConfig,
  GroupBase,
  SelectComponentsConfig,
} from 'chakra-react-select';

export const chakraStyles: ChakraStylesConfig = {
  loadingIndicator: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? 'gray.300' : 'primary',
  }),
  dropdownIndicator: (prev, { selectProps }) => ({
    ...prev,
    color: selectProps.menuIsOpen ? 'white' : 'gray.800',
    paddingInlineStart: 3,
    paddingInlineEnd: 3,
    background: selectProps.menuIsOpen ? 'blackAlpha.600' : 'blackAlpha.50',
    '> svg': {
      transform: `rotate(${selectProps.menuIsOpen ? -180 : 0}deg)`,
      fontSize: '1.4rem',
      transition: 'transform 0.2s ease',
    },
  }),
  menu: (provided) => ({
    ...provided,
    border: 0,
    boxShadow: 'xl',
    backdropFilter: 'blur(8px)',
  }),
  menuList: (provided) => ({
    ...provided,
    background: 'blackAlpha.600',
    border: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'white',
    fontWeight: 'medium',
    // eslint-disable-next-line no-nested-ternary
    background: state?.isMulti
      ? 'transparent'
      : state.isSelected
      ? 'primary'
      : 'transparent',

    // Keyboard navigation highlight
    ...(state.isFocused &&
      (!state.isSelected || state.isMulti) && {
        background: 'whiteAlpha.300',
      }),

    _hover: {
      background: state.isSelected ? 'primary' : 'whiteAlpha.400',
    },
  }),
};

export const customComponents: SelectComponentsConfig<
  unknown,
  boolean,
  GroupBase<unknown>
> = {
  Option: ({ children, ...props }) => (
    <chakraComponents.Option {...props}>
      <Flex alignItems="center" gap={2}>
        {props.isMulti && (
          <Checkbox
            isChecked={props.isSelected}
            colorScheme="orange"
            size="lg"
          />
        )}
        {children}
      </Flex>
    </chakraComponents.Option>
  ),
};
