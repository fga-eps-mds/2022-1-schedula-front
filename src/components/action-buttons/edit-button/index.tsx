import { RiEdit2Fill } from 'react-icons/ri';
import { ActionButton } from '..';
import { ActionButtonProps } from '../types';

type EditButtonProps<Data> = ActionButtonProps<Data>;

export function EditButton<Data>({
  onClick,
  label,
  ...props
}: EditButtonProps<Data>) {
  return (
    <ActionButton
      label={`Editar ${label || ''}`}
      icon={<RiEdit2Fill size={22} />}
      onClick={onClick}
      color="gray.700"
      {...props}
    />
  );
}
