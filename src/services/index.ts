import { AxiosRequestConfig } from "axios"

type Services = keyof typeof ServicesURLs

export const ServicesURLs = {
  usuarios: process.env.NEXT_PUBLIC_GESTOR_DE_USUARIOS_URL,
  chamados: process.env.NEXT_PUBLIC_DETALHADOR_CHAMADOS_URL,
  localidades: process.env.NEXT_PUBLIC_GERENCIADOR_DE_LOCALIDADES_URL
}

export class Service {
  baseURL: string
  resourceURL: string
  baseConfig: AxiosRequestConfig
  constructor(baseURL: string, resourceURL: string) {
    if (!baseURL) throw new Error("baseURL is required")

    // Add starting slash if not present
    if (!resourceURL.startsWith("/")) resourceURL = "/" + resourceURL

    // Remove trailing slash
    if (resourceURL.endsWith("/")) resourceURL = resourceURL.slice(0, -1)

    this.baseURL = baseURL
    this.resourceURL = resourceURL
    this.baseConfig = {
      baseURL,
      url: resourceURL
    }
  }

  get(config?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.baseConfig,
      ...config,
      method: "GET"
    }
  }

  post<Payload = void>(
    config?: AxiosRequestConfig<Payload>
  ): AxiosRequestConfig<Payload> {
    return {
      ...this.baseConfig,
      method: "POST",
      ...config
    }
  }

  put<Payload = void>(
    config?: AxiosRequestConfig<Payload>
  ): AxiosRequestConfig<Payload> {
    return {
      ...this.baseConfig,
      method: "PUT",
      ...config
    }
  }

  delete(config?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.baseConfig,
      ...config,
      method: "DELETE"
    }
  }

  status = () => this.get()

  newUrl = (url: string) =>
    this.resourceURL + (url.startsWith("/") ? url : "/" + url)

  create(resourceURL: string): Service {
    return new Service(this.baseURL, resourceURL)
  }

  //   static createAll = () => {
  //     const services = {} as Record<keyof typeof ServicesURLs, Service>

  //     Object.entries(ServicesURLs).forEach(([service, baseURL]) => {
  //       services[service as Services] = new Service(baseURL || "", "/")
  //     })

  //     return services
  //   }
}

// export const Services = Service.createAll()

const Services = {} as Record<keyof typeof ServicesURLs, Service>

Object.entries(ServicesURLs).forEach(([service, baseURL]) => {
  Services[service as Services] = new Service(baseURL || "", "/")
})

export { Services }
