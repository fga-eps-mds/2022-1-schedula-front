import { FaUsersCog } from 'react-icons/fa';
import { FiLayout } from 'react-icons/fi';

export interface IRoute {
  label: string;
  pathname: string;
  icon?: JSX.Element;
}

export const routes: IRoute[] = [
  //   {
  //     label: 'Dashboard',
  //     pathname: '/dashboard',
  //     icon: <MdOutlineDashboard size={28} />,
  //   },
  //   {
  //     label: 'Chamados',
  //     pathname: '/chamados',
  //     icon: <MdOutlineViewAgenda size={28} />,
  //   },
  //   {
  //     label: 'Registrar Chamado',
  //     pathname: '/registrachamado',
  //     icon: <MdOutlineCallToAction size={28} />,
  //   },
  {
    label: 'Categorias de Problema',
    pathname: '/categorias',
    icon: <FiLayout size={28} />,
  },
  //   {
  //     label: 'Cidades',
  //     pathname: '/listaCidades',
  //     icon: <MdOutlineLocationCity size={28} />,
  //   },
  {
    label: 'Usuarios',
    pathname: '/usuarios',
    icon: <FaUsersCog size={28} />,
  },
];
