import { useMemo } from "react"

import { useRequest } from "@hooks/useRequest"
import { serviceStatus } from "@services"

type Releases = {
  tag_name: string
  name: string
}

export const useServicesData = () => {
  const {
    data: chamadosStatus,
    isLoading: isLoadingChamadosStatus,
    error: errorChamados
  } = useRequest<ServiceStatus>(serviceStatus("chamados"))

  const {
    data: usuariosStatus,
    isLoading: isLoadingUsuariosStatus,
    error: errorUsuarios
  } = useRequest<ServiceStatus>(serviceStatus("usuarios"))

  const {
    data: localidadesStatus,
    isLoading: isLoadingLocalidadesStatus,
    error: errorLocalidades
  } = useRequest<ServiceStatus>(serviceStatus("localidades"))

  const { data: usuariosVersion, isLoading: isLoadingUserVersion } = useRequest<
    Releases[]
  >(
    process.env.NODE_ENV !== "development"
      ? {
          baseURL: "https://api.github.com",
          url: "/repos/fga-eps-mds/2022-1-schedula-gestor-de-usuarios/releases",
          method: "GET"
        }
      : null
  )

  const { data: chamadosVersion, isLoading: isLoadingChamadosVersion } =
    useRequest<Releases[]>(
      process.env.NODE_ENV !== "development"
        ? {
            baseURL: "https://api.github.com",
            url: "/repos/fga-eps-mds/2022-1-schedula-detalhador-de-chamados/releases",
            method: "GET"
          }
        : null
    )

  const { data: localidadesVersion, isLoading: isLoadingLocalidadesVersion } =
    useRequest<Releases[]>(
      process.env.NODE_ENV !== "development"
        ? {
            baseURL: "https://api.github.com",
            url: "/repos/fga-eps-mds/2022-1-schedula-gerenciador-de-localidades/releases",
            method: "GET"
          }
        : null
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
    isLoadingUserVersion,
    errorUsuarios,
    chamadosStatus,
    isLoadingChamadosStatus,
    isLoadingChamadosVersion,
    errorChamados,
    localidadesStatus,
    isLoadingLocalidadesStatus,
    isLoadingLocalidadesVersion,
    errorLocalidades,
    apiVersions
  }
}
