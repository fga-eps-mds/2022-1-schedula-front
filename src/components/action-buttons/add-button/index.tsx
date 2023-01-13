import { MdLibraryAdd } from 'react-icons/md';
import { ActionButton } from '..';

import type { ActionButtonProps } from '../types';

type AddButtonProps<Data> = ActionButtonProps<Data>;

export function AddButton<Data>({
  onClick,
  label,
  ...props
}: AddButtonProps<Data>) {
  return (
    <ActionButton
      label={label}
      icon={<MdLibraryAdd size={20} />}
      onClick={onClick}
      {...props}
    />
  );
}
