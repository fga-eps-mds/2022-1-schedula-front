import { IconType } from "react-icons"
import { BsSignpost2, BsTags, BsTelephonePlus } from "react-icons/bs"
import { FaUsersCog } from "react-icons/fa"
import { FiMapPin } from "react-icons/fi"
import { MdOutlineViewAgenda } from "react-icons/md"

export interface IRoute {
  label: string
  pathname: string
  icon?: IconType
}

export const routes: IRoute[] = [
  //   {
  //     label: 'Dashboard',
  //     pathname: '/dashboard',
  //     icon: MdOutlineDashboard,
  //   },
  {
    label: "Chamados",
    pathname: "/chamados",
    icon: MdOutlineViewAgenda
  },
  {
    label: "Registrar Chamado",
    pathname: "/chamados/registrar",
    icon: BsTelephonePlus
  },
  {
    label: "Categorias de Problema",
    pathname: "/categorias",
    icon: BsTags
  },
  {
    label: "Cidades",
    pathname: "/cidades",
    icon: BsSignpost2
  },
  {
    label: "Postos de Trabalho",
    pathname: "/workstation",
    icon: FiMapPin
  },
  {
    label: "Usuários",
    pathname: "/usuarios",
    icon: FaUsersCog
  }
]
