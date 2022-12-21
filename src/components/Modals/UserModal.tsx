import { useCallback } from "react"
import { toast } from "react-toastify"
import { ModalProps } from "@chakra-ui/react"

import { UserForm, UserFormValues } from "@components/Forms/UserForm"
import { Modal } from "@components/Modal"
import { request } from "@services/request"
import { createUser, updateUser } from "@services/Usuarios"

interface UserModalProps extends Partial<ModalProps> {
  user?: User | undefined
  onSubmit: (result: Result<ApiResponse<User>>) => void
  isOpen: boolean
  onClose: () => void
}

export const UserModal = ({
  onClose,
  user,
  onSubmit,
  ...props
}: UserModalProps) => {
  const handleSubmit = useCallback(
    async ({
      name,
      email,
      position,
      profile,
      username,
      confirmPassword,
      password
    }: UserFormValues) => {
      const payload: RegisterUserPayload = {
        name,
        username,
        email,
        position,
        profile: profile?.value,
        password,
        confirmPassword
      }

      const response = await request<User>(
        user ? updateUser(user.username)(payload) : createUser(payload)
      )

      onSubmit?.(response)

      if (response.type === "error") {
        // Let hook form know that submit was not successful
        toast.error(
          "Não foi possível salvar os dados do usuário. Tente novamente mais tarde!"
        )

        return Promise.reject(response.error?.message)
      } else {
        onClose?.()
      }
    },
    [user, onClose, onSubmit]
  )

  return (
    <Modal
      size="2xl"
      title={`${user ? "Editar" : "Novo"} Usuário`}
      onClose={onClose}
      {...props}
    >
      <UserForm defaultValues={user} onSubmit={handleSubmit} />
    </Modal>
  )
}
