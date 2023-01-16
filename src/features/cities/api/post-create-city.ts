import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { CITIES_ENDPOINT } from '@/features/cities/constants/requests';
import {
  PostCreateCityParams,
  PostCreateCityResponse,
} from '@/features/cities/api/types';
import { CITIES_CACHE_KEYS } from '@/features/cities/constants/cache';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';

function postCreateCity(data: PostCreateCityParams) {
  return api.post<PostCreateCityResponse>(`${CITIES_ENDPOINT}/cities`, data);
}

export function usePostCreateCity({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postCreateCity, {
    onSuccess() {
      queryClient.invalidateQueries([CITIES_CACHE_KEYS.allCities]);

      toast.success('Cidade criada com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar a cidade.'
      );
    },
  });
}
