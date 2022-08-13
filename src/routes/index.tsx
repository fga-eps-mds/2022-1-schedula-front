import { FaRegUser } from 'react-icons/fa';
import { FiLayout } from 'react-icons/fi';
import {
  MdOutlineCallToAction,
  MdOutlineDashboard,
  MdOutlineLocationCity,
  MdOutlineViewAgenda,
} from 'react-icons/md';
import { TbTestPipe } from 'react-icons/tb';

export interface IRoute {
  label: string;
  pathname: string;
  icon?: JSX.Element;
}

export const routes: IRoute[] = [
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
    label: 'Usuários',
    pathname: '/usuarios',
    icon: <FaRegUser size={28} />,
  },
  {
    label: 'Teste',
    pathname: '/teste',
    icon: <TbTestPipe size={28} />,
  },
];
