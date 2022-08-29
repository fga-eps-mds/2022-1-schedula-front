import { services } from "@services"

const resourceURL = "/problema"
const problemasService = services.chamados(resourceURL)

export const createProblemType = (payload: ProblemTypePayload) =>
  problemasService({
    method: "post",
    data: payload
  })

export const getProblemTypes = (id: number) =>
  problemasService({
    params: {
      category_id: id
    }
  })

export const updateProblemType =
  (id: number) => (payload: ProblemTypePayload) =>
    problemasService({
      url: resourceURL + `/${id}`,
      method: "put",
      data: payload
    })

export const deleteProblemType = (id: number) =>
  problemasService({
    url: resourceURL + `/${id}`,
    method: "delete"
  })
