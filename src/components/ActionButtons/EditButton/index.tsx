import { RiEdit2Fill } from "react-icons/ri"

import { ActionButton } from "@components/ActionButtons"

type EditButtonProps<Data> = ActionButton<Data>

export const EditButton = <Data,>({
  onClick,
  label
}: EditButtonProps<Data>) => {
  return (
    <ActionButton
      aria-label="Edit"
      label={`Editar ${label}`}
      icon={<RiEdit2Fill size={22} />}
      onClick={onClick}
      color="gray.700"
    />
  )
}
