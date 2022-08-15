import { createRequestConfig } from '@services/request';

import { api } from '../api';

export const usuariosApi = api;
usuariosApi.defaults.baseURL = process.env.NEXT_PUBLIC_GESTOR_DE_USUARIOS_URL;

export const getUsers = createRequestConfig({
  url: '/user',
  method: 'get',
});

export const createUser = createRequestConfig<CreateUserPayload>({
  url: '/user/',
  method: 'post',
});

export const updateUser = (username: string) =>
  createRequestConfig<CreateUserPayload>({
    url: `/user/${username}`,
    method: 'put',
  });

export const deleteUser = (username: string) => ({
  url: `/user/${username}`,
  method: 'delete',
});
