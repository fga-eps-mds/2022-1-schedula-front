import { createRequestConfig } from "@services/request"

export const getProblemCategories = createRequestConfig({
  url: "/categoria",
  method: "get"
})

export const getProblemCategory = (id: number) => ({
  url: `/categoria?category_id=${id}`,
  method: "get"
})

export const createProblemCategory =
  createRequestConfig<CategoriaProblemaPayload>({
    url: "/categoria",
    method: "post"
  })

export const updateProblemCategory = (id: number) =>
  createRequestConfig<CategoriaProblemaPayload>({
    url: `/categoria/${id}`,
    method: "put"
  })

export const deleteProblemCategory = (id: number) => ({
  url: `/categoria/${id}`,
  method: "delete"
})
