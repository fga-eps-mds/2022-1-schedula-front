import { Services } from "@services"

const ChamadoService = Services.chamados.create("/chamado")

export const getChamados = ChamadoService.get()

export const getChamadoById = (id: number) =>
  ChamadoService.get({ params: { id } })

export const createChamado = (payload: ChamadoPayload) =>
  ChamadoService.post({
    data: payload
  })

export const updateChamado = (id: number) => (payload: ChamadoPayload) =>
  ChamadoService.put({
    url: ChamadoService.newUrl(`/${id}`),
    data: payload
  })

export const deleteUser = (id: number) =>
  ChamadoService.delete({
    url: ChamadoService.newUrl(`/${id}`)
  })
