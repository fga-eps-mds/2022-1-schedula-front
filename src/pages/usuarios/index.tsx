import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  useDisclosure
} from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { UserForm } from "@components/Forms/UserForm"
import { ListItem } from "@components/ListItem"
import { ListItemSkeleton } from "@components/ListItem/LIstItemSkeleton"
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
        toast.success("Usuário criado com sucesso!")

        const newUsers = users?.data.filter(
          (user) => user.username !== userToEdit?.username
        )

        mutate({
          data: {
            error: null,
            message: "",
            data: [...(newUsers || []), response.value.data]
          }
        } as AxiosResponse<ApiData<User[]>>)

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

      {isLoading ? (
        <ListItemSkeleton />
      ) : (
        <Flex flexDirection="column" gap={6}>
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
        </Flex>
      )}

      {users && isValidating && (
        <Box mt={8}>
          <ListItemSkeleton />
        </Box>
      )}

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
