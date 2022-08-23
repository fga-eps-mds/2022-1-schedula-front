import { useMemo } from "react"
import axios from "axios"

import { useRequest } from "@hooks/useRequest"
import { detalhadorApi, localidadesApi, usuariosApi } from "@services/api"
import { serviceStatus } from "@services/request"

type Releases = {
  tag_name: string
  name: string
}

const githubApi = axios.create({
  baseURL: "https://api.github.com"
})

export const useServicesData = () => {
  const {
    data: chamadosStatus,
    isLoading: isLoadingChamadosStatus,
    error: errorChamados
  } = useRequest<ServiceStatus>(
    serviceStatus(detalhadorApi.defaults.baseURL as string),
    detalhadorApi
  )

  const {
    data: usuariosStatus,
    isLoading: isLoadingUsuariosStatus,
    error: errorUsuarios
  } = useRequest<ServiceStatus>(
    serviceStatus(usuariosApi.defaults.baseURL as string),
    usuariosApi
  )

  const {
    data: localidadesStatus,
    isLoading: isLoadingLocalidadesStatus,
    error: errorLocalidades
  } = useRequest<ServiceStatus>(
    serviceStatus(localidadesApi.defaults.baseURL as string),
    localidadesApi
  )

  const { data: usuariosVersion } = useRequest<Releases[]>(
    process.env.NODE_ENV === "development"
      ? {
          url: "/repos/fga-eps-mds/2022-1-schedula-gestor-de-usuarios/releases",
          method: "GET"
        }
      : null,
    githubApi
  )

  const { data: chamadosVersion } = useRequest<Releases[]>(
    process.env.NODE_ENV === "development"
      ? {
          url: "/repos/fga-eps-mds/2022-1-schedula-detalhador-de-chamados/releases",
          method: "GET"
        }
      : null,
    githubApi
  )

  const { data: localidadesVersion } = useRequest<Releases[]>(
    process.env.NODE_ENV === "development"
      ? {
          url: "/repos/fga-eps-mds/2022-1-schedula-gerenciador-de-localidades/releases",
          method: "GET"
        }
      : null,
    githubApi
  )

  const apiVersions = useMemo(
    () => ({
      usuarios: (usuariosVersion as unknown as Releases[])?.[0]?.tag_name,
      chamados: (chamadosVersion as unknown as Releases[])?.[0]?.tag_name,
      localidades: (localidadesVersion as unknown as Releases[])?.[0]?.tag_name
    }),
    [chamadosVersion, localidadesVersion, usuariosVersion]
  )

  return {
    usuariosStatus,
    isLoadingUsuariosStatus,
    errorUsuarios,
    chamadosStatus,
    isLoadingChamadosStatus,
    errorChamados,
    localidadesStatus,
    isLoadingLocalidadesStatus,
    errorLocalidades,
    apiVersions
  }
}
