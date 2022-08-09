import { FaRegUser } from 'react-icons/fa';
import { FiLayout } from 'react-icons/fi';
import {
  MdOutlineCallToAction,
  MdOutlineDashboard,
  MdOutlineLocationCity,
  MdOutlineViewAgenda,
} from 'react-icons/md';
import { RiLogoutCircleFill } from 'react-icons/ri';
import { TbTestPipe } from 'react-icons/tb';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';

import { SideBarItem, SideBarItemAttributes } from './SideBarItem';

const routes: SideBarItemAttributes[] = [
  {
    label: 'Dashboard',
    pathname: '/dashboard',
    icon: <MdOutlineDashboard size={28} />,
  },
  {
    label: 'Chamados',
    pathname: '/chamados',
    icon: <MdOutlineViewAgenda size={28} />,
  },
  {
    label: 'Registrar Chamado',
    pathname: '/registrachamado',
    icon: <MdOutlineCallToAction size={28} />,
  },
  {
    label: 'Tipos De Problemas',
    pathname: '/listaCategoria',
    icon: <FiLayout size={28} />,
  },
  {
    label: 'Cidades [admin]',
    pathname: '/listaCidades',
    icon: <MdOutlineLocationCity size={28} />,
  },
  {
    label: 'Teste',
    pathname: '/teste',
    icon: <TbTestPipe size={28} />,
  },
  {
    label: 'Usuários',
    pathname: '/usuarios',
    icon: <FaRegUser size={28} />,
  },
];

export const SideBar = () => {
  return (
    <Flex
      gap={2}
      flexDirection={'column'}
      width={225}
      height={'95vh'}
      position={'sticky'}
      top={5}
    >
      <Heading margin='0 auto' textAlign='center' fontWeight={'medium'}>
        Schedula
      </Heading>
      <Divider />
      <Flex flexDirection={'column'} gap={3}>
        {routes.map((route) => (
          <SideBarItem key={route.label} {...route} />
        ))}
      </Flex>

      <Box marginTop={'auto'}>
        <Divider marginBottom={2} />
        <Flex gap={2} justifyContent={'space-between'} alignItems={'center'}>
          <FaRegUser size={25} />
          <Text maxWidth={140} noOfLines={1}>
            Nome de user
          </Text>
          <RiLogoutCircleFill size={25} />
        </Flex>
      </Box>
    </Flex>
  );
};
