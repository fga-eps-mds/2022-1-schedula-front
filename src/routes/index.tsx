import { IconType } from 'react-icons';
import { FaUsersCog } from 'react-icons/fa';
import { FiLayout } from 'react-icons/fi';

export interface IRoute {
  label: string;
  pathname: string;
  icon?: IconType;
}

export const routes: IRoute[] = [
  //   {
  //     label: 'Dashboard',
  //     pathname: '/dashboard',
  //     icon: MdOutlineDashboard,
  //   },
  //   {
  //     label: 'Chamados',
  //     pathname: '/chamados',
  //     icon: MdOutlineViewAgenda,
  //   },
  //   {
  //     label: 'Registrar Chamado',
  //     pathname: '/registrachamado',
  //     icon: MdOutlineCallToAction,
  //   },
  {
    label: 'Categorias de Problema',
    pathname: '/categorias',
    icon: FiLayout,
  },
  //   {
  //     label: 'Cidades',
  //     pathname: '/listaCidades',
  //     icon: MdOutlineLocationCity,
  //   },
  {
    label: 'Usuários',
    pathname: '/usuarios',
    icon: FaUsersCog,
  },
];
