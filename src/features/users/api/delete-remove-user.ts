import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config/lib/axios';
import { toast } from '@/utils/toast';
import { USERS_CACHE_KEYS } from '@/features/users/constants/cache';
import { DeleteRemoveUserParams } from '@/features/users/api/types';
import { USERS_ENDPOINT } from '@/constants/requests';

function deleteRemoveUser({ userId }: DeleteRemoveUserParams) {
  return api.delete<boolean>(`${USERS_ENDPOINT}/users/${userId}`);
}

export function useDeleteRemoveUser() {
  const queryClient = useQueryClient();

  return useMutation(deleteRemoveUser, {
    onSuccess() {
      toast.success('Usuário removido com sucesso!');

      queryClient.invalidateQueries([USERS_CACHE_KEYS.allUsers]);
    },
    onError() {
      toast.error(
        'Não foi possível remover o usuário. Tente novamente mais tarde!'
      );
    },
  });
}
