import { AxiosInstance, AxiosRequestConfig } from "axios"

export const request = async <Data>(
  requestConfig: AxiosRequestConfig,
  api: AxiosInstance
): Promise<Result<Data>> => {
  try {
    const response = await api.request<Data>(requestConfig)

    return { type: "success", value: response.data }
  } catch (error) {
    return { type: "error", error: error as Error }
  }
}

export const createRequestConfig =
  <Payload>(config: AxiosRequestConfig<Payload>) =>
  (payload?: Payload): AxiosRequestConfig<Payload> => ({
    ...config,
    data: payload
  })

export const serviceStatus = (url: string): AxiosRequestConfig => ({
  url: "/",
  method: "GET",
  baseURL: url
})
