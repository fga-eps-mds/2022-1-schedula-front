import { IconButtonProps, TooltipProps } from '@chakra-ui/react';

export interface ActionButton<Item> {
  onClick: (item: Item) => void | Promise<void>;
  label?: string;
}

export type ActionButtonProps<T> = Omit<
  IconButtonProps,
  'onClick' | 'aria-label'
> &
  ActionButton<T> & {
    tooltipProps?: Partial<TooltipProps>;
  };
