import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import get from 'lodash/get';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

export type GetRequest = AxiosRequestConfig | null;

export type ApiData<Data> =
  | { data: Data; error: null | string; message: string }
  | undefined;

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
  isLoading: boolean;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'fallbackData'
  > {
  fallbackData?: Data;
  dataPath?: keyof Data | string | string[];
}

export function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  fetcher: AxiosInstance,
  { fallbackData, dataPath: path, ...config }: Config<ApiData<Data>, Error> = {}
): Return<ApiData<Data>, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<ApiData<Data>>, AxiosError<Error>>(
    request && JSON.stringify(request),
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    () => fetcher.request<ApiData<Data>>(request!),
    {
      ...config,
      fallbackData: fallbackData && {
        status: 200,
        statusText: 'InitialData',
        config: request!,
        headers: {},
        data: fallbackData,
      },
    }
  );

  const dataPath = path ? `data.${String(path)}` : 'data';

  return {
    data: get(response, dataPath),
    response,
    isLoading: !response && !error && !!request,
    error,
    isValidating,
    mutate,
  };
}
