import { AxiosRequestConfig } from "axios"

import { api } from "@services/api"

export const request = async <T, Data = ApiResponse<T>>(
  requestConfig: AxiosRequestConfig
): Promise<Result<Data>> => {
  try {
    const response = await api.request<Data>(requestConfig)

    return { type: "success", value: response.data }
  } catch (error) {
    return { type: "error", error: error as Error }
  }
}
