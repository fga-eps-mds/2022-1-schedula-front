import { Services } from "@services"

const WorkstationService = Services.localidades.create("/workstation")

export const getWorkstations = WorkstationService.get()

export const getWorkstationById = (workstation_id: number) =>
  WorkstationService.get({ params: { workstation_id } })

export const createWorkstation = (payload: CreateWorkstationPayload) =>
  WorkstationService.post({
    data: payload
  })

export const updateWorkstation =
  (id: number) => (payload: CreateWorkstationPayload) =>
    WorkstationService.put({
      url: WorkstationService.newUrl(`/${id}`),
      data: payload
    })

export const deleteWorkstation = (id: number) =>
  WorkstationService.delete({
    url: WorkstationService.newUrl(`/${id}`)
  })
