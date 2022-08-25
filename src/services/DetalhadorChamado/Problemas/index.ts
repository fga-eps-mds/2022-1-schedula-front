import { createRequestConfig } from "@services/request"

export const getProblemTypes = (id: number) => ({
  url: `/problema?category_id=${id}`,
  method: "get"
})

export const createProblemType = createRequestConfig<ProblemTypePayload>({
  url: "/problema",
  method: "post"
})

export const updateProblemType = (id: number) =>
  createRequestConfig<ProblemTypePayload>({
    url: `/problema/${id}`,
    method: "put"
  })

export const deleteProblemType = (id: number) => ({
  url: `/problema/${id}`,
  method: "delete"
})
