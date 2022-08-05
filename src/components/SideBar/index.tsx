import { FiLayout } from 'react-icons/fi';
import {
  MdOutlineCallToAction,
  MdOutlineDashboard,
  MdOutlineViewAgenda,
} from 'react-icons/md';
import { Divider, Flex, Heading } from '@chakra-ui/react';

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
    label: 'Gerenciar Tipos De Problemas',
    pathname: '/listaCategoria',
    icon: <FiLayout size={28} />,
  },
];

export const SideBar = () => {
  return (
    <Flex gap={2} flexDirection={'column'} width={225}>
      <Heading margin='0 auto' textAlign='center'>
        Schedula
      </Heading>
      <Divider />
      <Flex flexDirection={'column'} gap={3}>
        {routes.map((route) => (
          <SideBarItem key={route.label} {...route} />
        ))}
      </Flex>
    </Flex>
  );
};
