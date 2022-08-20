
import { createRequestConfig } from '@services/request';

export const getWorkstation = createRequestConfig({
  url: "/workstation",
  method: "get"
})

export const createWorkstation = createRequestConfig<CreateWorkstationPayload>({
  url: "/workstation",
  method: "post"
})

export const updateWorkstation = (id: number) =>
  createRequestConfig<CreateWorkstationPayload>({
    url: "/workstation/${id}",
    method: "put"
  })

export const deleteWorkstation = (id: number) => ({
  url: "/workstation/${id}",
  method: "delete"
})