import { services } from "@services"

const resourceURL = "/workstation"
const workstationsService = services.localidades(resourceURL)

export const getWorkstations = workstationsService()

export const createWorkstation = (payload: CreateWorkstationPayload) =>
  workstationsService({
    method: "post",
    data: payload
  })

export const updateWorkstation =
  (id: number) => (payload: CreateWorkstationPayload) =>
    workstationsService({
      url: resourceURL + `/${id}`,
      method: "put",
      data: payload
    })

export const deleteWorkstation = (id: number) =>
  workstationsService({
    url: resourceURL + `/${id}`,
    method: "delete"
  })
