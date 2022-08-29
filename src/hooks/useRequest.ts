import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import get from "lodash/get"
import useSWR, { SWRConfiguration, SWRResponse } from "swr"

import { api } from "@services/api"

export type GetRequest = AxiosRequestConfig | null

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    "isValidating" | "error" | "mutate"
  > {
  data: Data | undefined
  response: AxiosResponse<Data> | undefined
  isLoading: boolean
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    "fallbackData"
  > {
  fallbackData?: Data
  dataPath?: keyof Data | string | string[]
}

export function useRequest<T, Data = ApiResponse<T>, Error = unknown>(
  request: GetRequest,
  { fallbackData, dataPath: path, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate
  } = useSWR(
    request && JSON.stringify(request),
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- see above
    () => api.request<Data>(request!),
    {
      ...config,
      fallbackData: fallbackData && {
        status: 200,
        statusText: "InitialData",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- see above
        config: request!,
        headers: {},
        data: fallbackData
      }
    }
  )

  const dataPath = path ? `data.${String(path)}` : "data"

  return {
    data: get(response, dataPath),
    response,
    isLoading: !response && !error && !!request,
    error,
    isValidating,
    mutate
  }
}
