import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { Badge, Button, HStack, useDisclosure } from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { UserForm } from "@components/Forms/UserForm"
import { List } from "@components/List"
import { ListItem } from "@components/ListItem"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { ApiData, useRequest } from "@hooks/useRequest"
import { usuariosApi } from "@services/api"
import { request } from "@services/request"
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser
} from "@services/Usuarios"

const RoleBadge = (role: Accesses) => {
  switch (role) {
    case "admin":
      return (
        <Badge colorScheme="purple" variant="solid">
          Admin
        </Badge>
      )

    case "basic":
      return <Badge>Basico</Badge>

    case "manager":
      return <Badge colorScheme="green">Gerente</Badge>

    default:
      return <Badge>Basico</Badge>
  }
}

const Usuarios = () => {
  const {
    data: users,
    isLoading,
    isValidating,
    mutate
  } = useRequest<User[]>(getUsers(), usuariosApi)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [userToEdit, setUserToEdit] = useState<User>()

  const handleDelete = useCallback(
    (username: string) => async () => {
      const response = await request(deleteUser(username), usuariosApi)

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
          } as AxiosResponse<ApiData<User[]>>,
          { revalidate: false }
        )

        return
      }

      toast.error("Erro ao deletar Usuário!")
    },
    [users?.data, mutate]
  )

  const handleEdit = useCallback(
    (user: User) => () => {
      setUserToEdit(user)
      onOpen()
    },
    [onOpen]
  )

  const onSubmit = useCallback(
    async (data: CreateUserPayload) => {
      console.log("DATA: ", data)

      const response = await request<{ data: User }>(
        userToEdit ? updateUser(userToEdit.username)(data) : createUser(data),
        usuariosApi
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
          } as AxiosResponse<ApiData<User[]>>,
          { revalidate: false }
        )

        setUserToEdit(undefined)
        onClose()

        return
      }

      toast.error(response.error?.message)
    },
    [userToEdit, users?.data, mutate, onClose]
  )

  const handleClose = useCallback(() => {
    setUserToEdit(undefined)
    onClose()
  }, [onClose])

  return (
    <>
      <PageHeader title="Gerenciar Usuários">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          <Button onClick={onOpen}>Novo Usuário</Button>
        </HStack>
      </PageHeader>

      <List isLoading={isLoading || isValidating}>
        {users?.data?.map?.((item, key) => (
          <ListItem
            title={`${item?.name} [${item?.username}]`}
            description={
              <HStack spacing={2} mt={2.5}>
                <Badge colorScheme="gray" variant="outline">
                  {item?.job_role}
                </Badge>
                {RoleBadge(item?.acess)}
              </HStack>
            }
            key={key}
          >
            <ListItem.Actions
              itemName={item?.name}
              onEdit={handleEdit(item)}
              onDelete={handleDelete(item.username)}
            />
          </ListItem>
        ))}
      </List>

      <Modal
        title={userToEdit ? "Editar Usuário" : "Novo Usuário"}
        isOpen={isOpen}
        onClose={handleClose}
        size="2xl"
      >
        <UserForm defaultValues={userToEdit} onSubmit={onSubmit} />
      </Modal>
    </>
  )
}

export default Usuarios
