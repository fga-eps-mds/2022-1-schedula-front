import { AxiosRequestConfig } from "axios"

export const ServicesURLs = {
  usuarios: process.env.NEXT_PUBLIC_GESTOR_DE_USUARIOS_URL,
  chamados: process.env.NEXT_PUBLIC_DETALHADOR_CHAMADOS_URL,
  localidades: process.env.NEXT_PUBLIC_GERENCIADOR_DE_LOCALIDADES_URL
}

const createServiceConfig = (service: Service) => {
  const baseURL = ServicesURLs[service]

  return (resourceURL: string) =>
    <Payload = void>(config?: AxiosRequestConfig<Payload>) => ({
      baseURL,
      url: resourceURL,
      method: "GET",
      ...config
    })
}

const services = {} as Record<Service, ReturnType<typeof createServiceConfig>>

Object.keys(ServicesURLs).forEach(
  (service) =>
    (services[service as Service] = createServiceConfig(service as Service))
)

const serviceStatus = (service: Service): AxiosRequestConfig =>
  services[service]("/")()

export { services, serviceStatus }
