import { createRequestConfig } from '@services/request';

import { api } from '../api';

export const detalhadorApi = api;
detalhadorApi.defaults.baseURL =
  process.env.NEXT_PUBLIC_DETALHADOR_CHAMADOS_URL;

export const getProblemCategories = createRequestConfig({
  url: '/categoria',
  method: 'get',
});

export const createProblemCategory =
  createRequestConfig<IProblemCategoryPayload>({
    url: '/categoria',
    method: 'post',
  });

export const updateProblemCategory = (id: number) =>
  createRequestConfig<IProblemCategoryPayload>({
    url: `/categoria/${id}`,
    method: 'put',
  });

export const deleteProblemCategory = (id: number) => ({
  url: `/categoria/${id}`,
  method: 'delete',
});
