import { Services } from "@services"

const ChamadoService = Services.chamados.create("/chamado")

export const getChamados = ChamadoService.get

export const getChamadoById = (id: number) =>
  ChamadoService.get({ params: { id } })

export const createChamado = ChamadoService.post<ChamadoPayload>

export const updateChamado = ChamadoService.put<ChamadoPayload>

export const deleteChamado = ChamadoService.delete
