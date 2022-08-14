import { useEffect, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Box, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';

import { ListagemHeader } from '@components/ListagemHeader';

interface IUser {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

interface ResponseUser {
  email: string;
  username: string;
  active: true;
  acess: string;
  job_role: string;
  name: string;
  password: string;
  updated_at: string;
}

const Usuarios = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + '/user')
      .then((usersData) => {
        setUsers(
          usersData.data.data.map((user: ResponseUser) => {
            return {
              id: user.username,
              name: user.name,
              email: user.email,
              active: user.active,
            };
          })
        );
      });
  }, []);

  const deleteUser = (id: string) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
  };

  return (
    <>
      <ListagemHeader
        header='Gerenciar Usuários'
        underHeader='Lista de Usuários'
      >
        <></>
      </ListagemHeader>
      <Flex flexDirection='column' gap={4} mt={20}>
        {users.map((user, index) => (
          <Flex
            key={index}
            w='100%'
            justifyContent='space-between'
            align='center'
          >
            <Box width='50%'>
              <Text color='#675775' fontWeight='bold' mb={2}>
                {user.name}
              </Text>
              <Box marginBottom='14px' color='#A39DAA'>
                {user.id}
                <hr></hr>
              </Box>
            </Box>
            <Flex gap={2}>
              <BiEditAlt
                cursor='pointer'
                size={28}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop -- ?
                onClick={() => {
                  deleteUser(user.id); //Trocar para EditUser depois
                }}
              />
              <RiDeleteBin6Line
                cursor='pointer'
                size={28}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop -- ?
                onClick={() => {
                  deleteUser(user.id);
                }}
              />
            </Flex>
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default Usuarios;
