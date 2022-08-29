import { services } from "@services"

const resourceURL = "/categoria"
const categoriasService = services.chamados(resourceURL)

export const createProblemCategory = (payload: CategoriaProblemaPayload) =>
  categoriasService({
    method: "POST",
    data: payload
  })

export const getProblemCategories = categoriasService()

export const getProblemCategory = (id: number) =>
  categoriasService({
    params: {
      category_id: id
    }
  })

export const updateProblemCategory =
  (id: number) => (payload: CategoriaProblemaPayload) =>
    categoriasService({
      url: resourceURL + `/${id}`,
      method: "put",
      data: payload
    })

export const deleteProblemCategory = (id: number) =>
  categoriasService({
    url: resourceURL + `/${id}`,
    method: "delete"
  })
