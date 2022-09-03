import { useMemo } from "react"
import { toast } from "react-toastify"

import { useRequest } from "@hooks/useRequest"
import { Service, Services } from "@services"

type Releases = {
  tag_name: string
  name: string
}

const GithubService = new Service(
  "https://api.github.com",
  "/repos/fga-eps-mds"
)

export const useServicesData = () => {
  const { isLoading: isLoadingChamadosStatus, error: errorChamados } =
    useRequest<ServiceStatus>(Services.chamados.status(), {
      onLoadingSlow: () => toast.warn("A API de chamados está lenta. 😕")
    })

  const { isLoading: isLoadingUsuariosStatus, error: errorUsuarios } =
    useRequest<ServiceStatus>(Services.usuarios.status(), {
      onLoadingSlow: () => toast.warn("A API de usuários está lenta. 😕")
    })

  const { isLoading: isLoadingLocalidadesStatus, error: errorLocalidades } =
    useRequest<ServiceStatus>(Services.localidades.status(), {
      onLoadingSlow: () =>
        toast.warn("A API de localidades está lenta. 😕", {
          autoClose: false
        })
    })

  const { data: usuariosVersion, isLoading: isLoadingUserVersion } = useRequest<
    Releases[]
  >(
    process.env.NODE_ENV !== "development"
      ? GithubService.get({
          url: GithubService?.newUrl(
            "/2022-1-schedula-gestor-de-usuarios/releases"
          )
        })
      : null
  )

  const { data: chamadosVersion, isLoading: isLoadingChamadosVersion } =
    useRequest<Releases[]>(
      process.env.NODE_ENV !== "development"
        ? GithubService.get({
            url: GithubService?.newUrl(
              "/2022-1-schedula-detalhador-de-chamados/releases"
            )
          })
        : null
    )

  const { data: localidadesVersion, isLoading: isLoadingLocalidadesVersion } =
    useRequest<Releases[]>(
      process.env.NODE_ENV !== "development"
        ? GithubService.get({
            url: GithubService?.newUrl(
              "/2022-1-schedula-gerenciador-de-localidades/releases"
            )
          })
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

  console.log("CHAMADOS", errorChamados)

  return {
    usuariosStatus: !errorUsuarios,
    isLoadingUsuariosStatus,
    isLoadingUserVersion,
    chamadosStatus: !errorChamados,
    isLoadingChamadosStatus,
    isLoadingChamadosVersion,
    localidadesStatus: !errorLocalidades,
    isLoadingLocalidadesStatus,
    isLoadingLocalidadesVersion,
    apiVersions
  }
}
