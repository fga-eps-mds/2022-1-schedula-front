import { Children, cloneElement, ReactElement } from 'react';
import { HStack } from '@chakra-ui/react';
import { ActionButton } from '@/components/action-buttons/types';

export interface ActionsProps<Data> {
  item: Data;
  children:
    | ReactElement<ActionButton<Data>>
    | ReactElement<ActionButton<Data>>[]
    | null;
}

export function Actions<Data>({ children, item }: ActionsProps<Data>) {
  return (
    <HStack spacing={4} role="menubar" alignSelf="end">
      {Children.map(
        children,
        (child) =>
          child &&
          cloneElement(child, {
            onClick: child?.props?.onClick?.bind?.(null, item),
          })
      )}
    </HStack>
  );
}
