import { useEffect, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Box, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';

import { ListagemHeader } from '@components/ListagemHeader';

interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const Usuarios = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((usersData) => {
        console.log(usersData.data);
        setUsers(usersData.data);
      });
  }, []);

  const deleteUser = (id: number) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
  };

  return (
    <>
      <ListagemHeader
        header='Gerenciar Usuários'
        underHeader='Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt eaque
      aspernatur'
      >
        <></>
      </ListagemHeader>

      <Flex flexDirection='column' gap={4}>
        {users.map((user, index) => (
          <Flex
            key={index}
            w='100%'
            justifyContent='space-between'
            align='center'
          >
            <Box>
              <Text fontWeight='bold' mb={1}>
                {user.name}
              </Text>
              <Box>{user.phone}</Box>
              <Box>{user.id}</Box>
            </Box>
            <Flex gap={2}>
              <BiEditAlt />
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
