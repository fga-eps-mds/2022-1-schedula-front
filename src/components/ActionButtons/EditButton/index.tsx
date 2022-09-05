import { RiEdit2Fill } from "react-icons/ri"

import { ActionButton, ActionButtonProps } from "@components/ActionButtons"

type EditButtonProps<Data> = ActionButtonProps<Data>

export const EditButton = <Data,>({
  onClick,
  label,
  ...props
}: EditButtonProps<Data>) => {
  return (
    <ActionButton
      label={`Editar ${label || ""}`}
      icon={<RiEdit2Fill size={22} />}
      onClick={onClick}
      color="gray.700"
      {...props}
    />
  )
}
