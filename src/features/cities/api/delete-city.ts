import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { CITIES_ENDPOINT } from '@/features/cities/constants/requests';
import { toast } from '@/utils/toast';
import { CITIES_CACHE_KEYS } from '@/features/cities/constants/cache';
import { DeleteCityParams } from '@/features/cities/api/types';

function deleteCity({ cityId }: DeleteCityParams) {
  return api.delete<boolean>(`${CITIES_ENDPOINT}/cities/${cityId}`);
}

export function useDeleteCity() {
  const queryClient = useQueryClient();

  return useMutation(deleteCity, {
    onSuccess() {
      toast.success('Cidade removida com sucesso!');

      queryClient.invalidateQueries([CITIES_CACHE_KEYS.allCities]);
    },
    onError() {
      toast.error(
        'Não foi possível remover a cidade. Tente novamente mais tarde!'
      );
    },
  });
}
