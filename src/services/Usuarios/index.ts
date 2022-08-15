import { createRequestConfig } from '@services/request';

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
