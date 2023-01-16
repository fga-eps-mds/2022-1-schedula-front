import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import {
  PutUpdateUserParams,
  PutUpdateUserResponse,
} from '@/features/users/api/types';
import { toast } from '@/utils/toast';
import { USERS_CACHE_KEYS } from '@/features/users/constants/cache';
import { ApiError } from '@/config/lib/axios/types';
import { USERS_ENDPOINT } from '@/constants/requests';

function putUpdateUser({ userId, data }: PutUpdateUserParams) {
  return api.put<PutUpdateUserResponse>(
    `${USERS_ENDPOINT}/users/${userId}`,
    data
  );
}

export function usePutUpdateUser({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(putUpdateUser, {
    onSuccess() {
      queryClient.invalidateQueries([USERS_CACHE_KEYS.allUsers]);

      toast.success('Usuário atualizado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar editar o usuário.'
      );
    },
  });
}
