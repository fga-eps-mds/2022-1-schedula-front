import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { Button, HStack, useDisclosure } from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { UserItem } from "@components/Items/UserItem"
import { ListView } from "@components/List"
import { UserModal } from "@components/Modals/UserModal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { useRequest } from "@hooks/useRequest"
import { getUsers } from "@services/Usuarios"

const Usuarios = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [userToEdit, setUserToEdit] = useState<User>()

  const {
    data: users,
    isLoading,
    isValidating,
    mutate
  } = useRequest<User[]>(getUsers)

  const router = useRouter()
  RedirectUnauthenticated(router)
  const { data: session } = useSession()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [userToEdit, setUserToEdit] = useState<User>()

  const handleDelete = useCallback(
    async ({ username }: User) => {
      if (session?.user.access === "admin") {
        const response = await request(deleteUser(username))

        if (response.type === "success") {
          toast.success("Usuário removido com sucesso!")

          const newUsers = users?.data.filter(
            (user) => user.username !== username
          )

          mutate(
            {
              data: {
                error: null,
                message: "",
                data: newUsers || ([] as User[])
              }
            } as AxiosResponse<ApiResponse<User[]>>,
            { revalidate: false }
          )

          return
        }

  const refresh = useCallback(
    (data?: User[]) =>
      mutate(
        {
          data: {
            error: null,
            message: "",
            data: data ?? []
          }
        } as AxiosResponse<ApiResponse<User[]>>,
        { revalidate: !data }
      ),
    [mutate]
  )

  const onDelete = useCallback(
    (result: Result<ApiResponse<null>>, { username }: User) => {
      if (result.type === "success") {
        toast.success(result.value?.message)

        const newUsers = users?.data.filter(
          (user) => user.username !== username
        )
        refresh(newUsers)


        toast.error("Erro ao deletar Usuário!")
      } else {
        toast.error("Acesso Negado!")
      }

    },
    [session?.user.access, users?.data, mutate]


      toast.error(result.error?.message)
    },
    [refresh, users?.data]

  )

  const onEdit = useCallback(
    (user: User) => {
      if (session?.user.access !== "basic") {
        setUserToEdit(user)
        onOpen()
      } else {
        toast.error("Acesso Negado!")
      }
    },
    [onOpen, session?.user.access]
  )

  const onSubmit = useCallback(
    async (data: RegisterUserPayload) => {
      if (session?.user.access !== "basic") console.log("DATA: ", data)

      const response = await request<{ data: User }>(
        userToEdit ? updateUser(userToEdit.username)(data) : createUser(data)
      )

      if (response.type === "success") {
        toast.success(
          `Usuário ${userToEdit ? "editado" : "criado"} com sucesso!`
        )
        const newUsers = userToEdit
          ? users?.data.map((user) =>
              user.username === userToEdit?.username
                ? response.value.data
                : user
            )
          : [...(users?.data || []), response.value.data]

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newUsers
            }
          } as AxiosResponse<ApiResponse<User[]>>,
          { revalidate: false }
        )

        setUserToEdit(undefined)
        onClose()

    (result: Result<ApiResponse<User>>) => {
      if (result.type === "error") {
        toast.error(result.error?.message)


        return
      }

      toast.success(result.value?.message)

      const newUsers = userToEdit
        ? users?.data.map((user) =>
            user.username === userToEdit?.username ? result.value.data : user
          )
        : [...(users?.data || []), result.value?.data]

      refresh(newUsers)
      setUserToEdit(undefined)
      onClose()
    },

    [session?.user.access, userToEdit, users?.data, mutate, onClose]

  )

  const handleClose = useCallback(() => {
    setUserToEdit(undefined)
    onClose()
  }, [onClose])

  const renderUserItem = useCallback(
    (user: User) => (
      <UserItem user={user} onEdit={onEdit} onDelete={onDelete} />
    ),
    [onDelete, onEdit]
  )

  return (
    <>
      <PageHeader title="Gerenciar Usuários">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          {session?.user.access !== "basic" ? (
            <></>
          ) : (
            <Button onClick={onOpen}>Novo Usuário</Button>
          )}
        </HStack>
      </PageHeader>

      <ListView<User>
        items={users?.data}
        render={renderUserItem}
        isLoading={isLoading || isValidating}
      />


      <UserModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={onSubmit}
        user={userToEdit}
      />
    </>
  )
}

export default Usuarios
