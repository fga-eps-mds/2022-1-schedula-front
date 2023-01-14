import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { USERS_ENDPOINT } from '@/features/users/constants/requests';
import {
  PostCreateUserParams,
  PostCreateUserResponse,
} from '@/features/users/api/types';
import { USERS_CACHE_KEYS } from '@/features/users/constants/cache';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';

function postCreateUser(data: PostCreateUserParams) {
  return api.post<PostCreateUserResponse>(`${USERS_ENDPOINT}/users`, data);
}

export function usePostCreateUser({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postCreateUser, {
    onSuccess() {
      queryClient.invalidateQueries([USERS_CACHE_KEYS.allUsers]);

      toast.success('Usuário criado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar criar o usuário.'
      );
    },
  });
}
