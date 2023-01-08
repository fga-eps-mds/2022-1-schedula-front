import { Badge, HStack } from '@chakra-ui/react';
import { Item } from '@/components/list-item';

interface UserItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => Promise<void>;
}

export function UserItem({ user, onEdit, onDelete }: UserItemProps) {
  const isEditAuthorized = true;
  const isDeleteAuthorized = true;

  return (
    // <Item
    //   title={`${user?.name} [${user?.username}]`}
    //   description={
    //     <HStack spacing={2} mt={2.5}>
    //       {RoleBadge(user?.profile)}
    //       <Badge colorScheme="gray" variant="outline">
    //         {user?.position}
    //       </Badge>
    //     </HStack>
    //   }
    // >
    //   <Item.Actions item={user}>
    //     {
    //       (isEditAuthorized && (
    //         <EditButton onClick={onEdit} label={user.name} />
    //       )) as ReactElement
    //     }
    //     {
    //       (isDeleteAuthorized && (
    //         <DeleteButton onClick={() => onDelete(user.id)} label={user.name} />
    //       )) as ReactElement
    //     }
    //   </Item.Actions>
    // </Item>
    <p>CORRIGIR</p>
  );
}

function RoleBadge(role: Access) {
  switch (role) {
    case 'ADMIN':
      return (
        <Badge colorScheme="purple" variant="solid">
          Administrador
        </Badge>
      );

    case 'BASIC':
      return <Badge>Usuário</Badge>;

    // case "MANAGER":
    //   return <Badge colorScheme="green">Gerente</Badge>

    default:
      return <Badge>Básico</Badge>;
  }
}
