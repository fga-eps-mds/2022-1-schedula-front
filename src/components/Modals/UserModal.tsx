import { useCallback } from "react"
import { toast } from "react-toastify"
import { ModalProps } from "@chakra-ui/react"

import { UserForm, UserFormValues } from "@components/Forms/UserForm"
import { Modal } from "@components/Modal"
import { apiClient } from "@services/apiClient"

interface UserModalProps extends Partial<ModalProps> {
  user?: User | undefined
  onSubmit: () => void
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

      const endpoint = user
        ? process.env.NEXT_PUBLIC_GESTOR_DE_USUARIOS_URL + "/users/" + user.id
        : process.env.NEXT_PUBLIC_GESTOR_DE_USUARIOS_URL + "/users"

      try {
        if (user) {
          await apiClient.put(endpoint, payload)
          toast.success("Usuário editado com sucesso!")
        } else {
          await apiClient.post(endpoint, payload)
          toast.success("Usuário criado com sucesso!")
        }

        onSubmit()
        onClose?.()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(
          `Não foi possível salvar os dados do usuário. ${err?.response?.data?.message}`
        )

        console.log(err)

        return Promise.reject(err?.message)
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
