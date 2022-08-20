import { createRequestConfig } from '@services/request';

export const getWorkstation = createRequestConfig({
  url: "/workstation",
  method: "get"
})

export const createWorkstation = createRequestConfig<CreateUserPayload>({
  url: "/workstation",
  method: "post"
})

export const updateWorkstation = (id: number) =>
  createRequestConfig<CreateUserPayload>({
    url: "/workstation/${id}",
    method: "put"
  })

export const deleteWorkstation = (id: number) => ({
  url: "/workshop/${id}",
  method: "delete"
})
