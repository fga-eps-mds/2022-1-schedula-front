import { MdLibraryAdd } from "react-icons/md"

import { ActionButton, ActionButtonProps } from "@components/ActionButtons"

type AddButtonProps<Data> = ActionButtonProps<Data>

export const AddButton = <Data,>({
  onClick,
  label,
  ...props
}: AddButtonProps<Data>) => {
  return (
    <ActionButton
      label={label}
      icon={<MdLibraryAdd size={20} />}
      onClick={onClick}
      {...props}
    />
  )
}
