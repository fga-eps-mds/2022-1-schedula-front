import { MdLibraryAdd } from "react-icons/md"

import { ActionButton } from "@components/ActionButtons"

type AddButtonProps<Data> = ActionButton<Data>

export const AddButton = <Data,>({ onClick, label }: AddButtonProps<Data>) => {
  return (
    <ActionButton
      aria-label="Add"
      label={label}
      icon={<MdLibraryAdd size={20} />}
      onClick={onClick}
    />
  )
}
