import { useCallback, useEffect, useState } from 'react';
import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { api } from '@/config/lib/axios';
import { toast } from '@/utils/toast';
import { UserItem } from '@/components/items/user-item';
import { PageHeader } from '@/components/page-header';
import { RefreshButton } from '@/components/action-buttons/refresh-button';
import { ListView } from '@/components/list';
import { UserModal } from '@/components/modals/user-modal';

function Usuarios() {
  const isCreateAuthorized = true;
  const isValidating = false;
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userToEdit, setUserToEdit] = useState<User>();

  async function getUsers() {
    setIsLoading(true);

    try {
      const response = await api.get<User[]>(
        `${process.env.NEXT_PUBLIC_GESTOR_DE_USUARIOS_URL}/users`
      );

      setUsers(response.data);
    } catch {
      toast.error('Não foi possível carregar os dados dos usuários');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const mutate = async () => {
    getUsers();
  };

  const onDelete = useCallback(async (userId: string) => {
    try {
      await api.delete(
        `${process.env.NEXT_PUBLIC_GESTOR_DE_USUARIOS_URL}/users/${userId}`
      );

      getUsers();

      toast.success('Usuário removido com sucesso!');
    } catch {
      toast.error('Não foi possível remover o usuário. Tente novamente!');
    }
  }, []);

  const onSubmit = () => {
    getUsers();
  };

  const onEdit = useCallback(
    (user: User) => {
      setUserToEdit(user);
      onOpen();
    },
    [onOpen]
  );

  const handleClose = useCallback(() => {
    setUserToEdit(undefined);
    onClose();
  }, [onClose]);

  const renderUserItem = useCallback(
    (user: User) => (
      <UserItem user={user} onEdit={onEdit} onDelete={onDelete} />
    ),
    [onDelete, onEdit]
  );

  return (
    <>
      <PageHeader title="Gerenciar Usuários">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          {isCreateAuthorized && <Button onClick={onOpen}>Novo Usuário</Button>}
        </HStack>
      </PageHeader>

      <ListView<User>
        items={users}
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
  );
}

export default Usuarios;
