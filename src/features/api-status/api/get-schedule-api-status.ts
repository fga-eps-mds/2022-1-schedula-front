import { useQuery } from '@tanstack/react-query';

import { api } from '@/config/lib/axios';

import { API_STATUS_CACHE_KEYS } from '@/features/api-status/constants/cache';
import { SCHEDULES_ENDPOINT } from '@/constants/requests';
import { toast } from '@/utils/toast';

const getScheduleApiStatus = async () =>
  api
    .get<boolean>(SCHEDULES_ENDPOINT)
    .then((response) => response.data)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);

      toast.error('O Serviço de chamados está fora do ar', 'Indisponível!');

      return false;
    });

export const useGetScheduleApiStatus = () =>
  useQuery([API_STATUS_CACHE_KEYS.schedulesStatus], getScheduleApiStatus, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
