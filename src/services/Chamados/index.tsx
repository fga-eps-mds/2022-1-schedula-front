import { services } from "@services"

const resourceURL = "/chamado"
const chamadosService = services.chamados(resourceURL)

export const createChamado = (payload: Chamado) =>
  chamadosService({
    method: "POST",
    data: payload
  })

export const getChamados = chamadosService()

export const getProblemCategory = (id: number) =>
  chamadosService({
    params: {
      category_id: id
    }
  })

export const updateProblemCategory =
  (id: number) => (payload: CategoriaProblemaPayload) =>
    chamadosService({
      url: resourceURL + `/${id}`,
      method: "put",
      data: payload
    })

export const deleteProblemCategory = (id: number) =>
  chamadosService({
    url: resourceURL + `/${id}`,
    method: "delete"
  })
