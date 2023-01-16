import { useQuery } from '@tanstack/react-query';

import { api } from '@/config/lib/axios';

import { API_STATUS_CACHE_KEYS } from '@/features/api-status/constants/cache';
import { USERS_ENDPOINT } from '@/constants/requests';
import { toast } from '@/utils/toast';

const getUsersApiStatus = async () =>
  api
    .get<boolean>(USERS_ENDPOINT)
    .then((response) => response.data)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);

      toast.error('O Serviço de usuários está fora do ar', 'Indisponível!');

      return false;
    });

export const useGetUsersApiStatus = () =>
  useQuery([API_STATUS_CACHE_KEYS.usersStatus], getUsersApiStatus, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
