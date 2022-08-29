import { services } from "@services"

const resourceURL = "/chamado"
const chamadosService = services.chamados(resourceURL)

export const createChamado = (payload: ChamadoPayload) =>
  chamadosService({
    method: "POST",
    data: payload
  })

export const getChamados = chamadosService()

export const getChamado = (id: number) =>
  chamadosService({
    params: {
      category_id: id
    }
  })

export const updateChamado = (id: number) => (payload: ChamadoPayload) =>
  chamadosService({
    url: resourceURL + `/${id}`,
    method: "put",
    data: payload
  })

export const deleteChamado = (id: number) =>
  chamadosService({
    url: resourceURL + `/${id}`,
    method: "delete"
  })
