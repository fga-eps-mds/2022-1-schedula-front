import { useQuery } from '@tanstack/react-query';

import { api } from '@/config/lib/axios';

import { API_STATUS_CACHE_KEYS } from '@/features/api-status/constants/cache';
import { LOCATIONS_ENDPOINT } from '@/constants/requests';
import { toast } from '@/utils/toast';

const getLocationsApiStatus = async () =>
  api
    .get<boolean>(LOCATIONS_ENDPOINT)
    .then((response) => response.data)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);

      toast.error('O Serviço de localidades está fora do ar', 'Indisponível!');

      return false;
    });

export const useGetLocationsApiStatus = () =>
  useQuery([API_STATUS_CACHE_KEYS.locationsStatus], getLocationsApiStatus, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
