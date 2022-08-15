import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Badge,
  Button,
  Flex,
  HStack,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';

import { UserForm } from '@components/Forms/UserForm';
import { ListItem } from '@components/ListItem';
import { Modal } from '@components/Modal/Modal';
import { PageHeader } from '@components/PageHeader';
import { ApiData, useRequest } from '@hooks/useRequest';
import { request } from '@services/request';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  usuariosApi,
} from '@services/Usuarios';

const RoleBadge = (role: Accesses) => {
  switch (role) {
    case 'admin':
      return (
        <Badge colorScheme='purple' variant='solid'>
          Admin
        </Badge>
      );

    case 'basic':
      return <Badge>Basico</Badge>;

    case 'manager':
      return <Badge colorScheme='green'>Gerente</Badge>;

    default:
      return <Badge>Basico</Badge>;
  }
};

const Usuarios = () => {
  const {
    data: users,
    isLoading,
    mutate,
  } = useRequest<User[]>(getUsers(), usuariosApi);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userToEdit, setUserToEdit] = useState<User>();

  const handleDelete = useCallback(
    (username: string) => async () => {
      const response = await request(deleteUser(username), usuariosApi);

      if (response.type === 'success') {
        toast.success('Usuario removido com sucesso!');

        const newUsers = users?.data.filter(
          (user) => user.username !== username
        );

        mutate(
          {
            data: {
              error: null,
              message: '',
              data: newUsers || ([] as User[]),
            },
          } as AxiosResponse<ApiData<User[]>>,
          { revalidate: false }
        );

        return;
      }

      toast.error('Erro ao deletar Usuario!');
    },
    [users?.data, mutate]
  );

  const handleEdit = useCallback(
    (user: User) => () => {
      setUserToEdit(user);
      onOpen();
    },
    [onOpen]
  );

  const onSubmit = useCallback(
    async (data: CreateUserPayload) => {
      console.log('DATA: ', data);

      const response = await request<{ data: User }>(
        userToEdit ? updateUser(userToEdit.username)(data) : createUser(data),
        usuariosApi
      );

      if (response.type === 'success') {
        toast.success('Usuario criado com sucesso!');

        const newUsers = users?.data.filter(
          (user) => user.username !== userToEdit?.username
        );

        mutate({
          data: {
            error: null,
            message: '',
            data: [...(newUsers || []), response.value.data],
          },
        } as AxiosResponse<ApiData<User[]>>);

        setUserToEdit(undefined);
        onClose();

        return;
      }

      toast.error(response.error?.message);
    },
    [userToEdit, users?.data, mutate, onClose]
  );

  const handleClose = useCallback(() => {
    setUserToEdit(undefined);
    onClose();
  }, [onClose]);

  return (
    <>
      <PageHeader title='Gerenciar Usuarios'>
        <Button onClick={onOpen}>Novo Usuarios</Button>
      </PageHeader>

      {isLoading ? (
        <Spinner />
      ) : (
        <Flex flexDirection='column' gap={8}>
          {users?.data?.map?.((item, key) => (
            <ListItem
              title={`${item?.name} [${item?.username}]`}
              description={
                <HStack spacing={2} mb={2}>
                  <Badge colorScheme='gray' variant='outline'>
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

      <Modal
        title={userToEdit ? 'Editar Usuario' : 'Novo Usuario'}
        isOpen={isOpen}
        onClose={handleClose}
        size='2xl'
      >
        <UserForm defaultValues={userToEdit} onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

export default Usuarios;
