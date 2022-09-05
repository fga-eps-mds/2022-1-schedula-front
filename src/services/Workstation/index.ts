import { Services } from "@services"

const WorkstationService = Services.localidades.create("/workstation")
const RegionalService = Services.localidades.create("/regional")

export const getWorkstations = WorkstationService.get

export const getWorkstationById = (workstation_id: number) =>
  WorkstationService.get({ params: { workstation_id } })

export const createWorkstation =
  WorkstationService.post<CreateWorkstationPayload>

export const updateWorkstation =
  WorkstationService.put<CreateWorkstationPayload>

export const deleteWorkstation = WorkstationService.delete

export const getRegionais = RegionalService.get()

// export const getRegionais = workstationsService({
//   url: "/regional",
//   method: "get"
// })
