import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { CITIES_ENDPOINT } from '@/features/cities/constants/requests';
import {
  PutUpdateCityParams,
  PutUpdateCityResponse,
} from '@/features/cities/api/types';
import { toast } from '@/utils/toast';
import { CITIES_CACHE_KEYS } from '@/features/cities/constants/cache';
import { ApiError } from '@/config/lib/axios/types';

function putUpdateCity({ cityId, data }: PutUpdateCityParams) {
  return api.put<PutUpdateCityResponse>(
    `${CITIES_ENDPOINT}/cities/${cityId}`,
    data
  );
}

export function usePutUpdateCity({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(putUpdateCity, {
    onSuccess() {
      queryClient.invalidateQueries([CITIES_CACHE_KEYS.allCities]);

      toast.success('Cidade atualizada com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar editar a cidade.'
      );
    },
  });
}
