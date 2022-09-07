import { useCallback } from "react"
import { Badge, HStack } from "@chakra-ui/react"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { Item } from "@components/ListItem"
import { request } from "@services/request"
import { deleteUser } from "@services/Usuarios"

interface UserItemProps {
  user: User
  onEdit: (user: User) => void
  onDelete: (result: Result<ApiResponse<null>>, user: User) => void
}

export const UserItem = ({ user, onEdit, onDelete }: UserItemProps) => {
  const handleDelete = useCallback(
    async ({ username }: User) => {
      const response = await request<null>(deleteUser(username))

      onDelete?.(response, user)
    },
    [user, onDelete]
  )

  return (
    <Item
      title={`${user?.name} [${user?.username}]`}
      description={
        <HStack spacing={2} mt={2.5}>
          <Badge colorScheme="gray" variant="outline">
            {user?.job_role}
          </Badge>
          {RoleBadge(user?.acess)}
        </HStack>
      }
    >
      <Item.Actions item={user}>
        <EditButton onClick={onEdit} label={user.name} />
        <DeleteButton onClick={handleDelete} label={user.name} />
      </Item.Actions>
    </Item>
  )
}

const RoleBadge = (role: Access) => {
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
