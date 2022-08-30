import { Services } from "@services"

const ProblemTypeService = Services.chamados.create("/problema")

export const getProblemTypes = (category_id: number) =>
  ProblemTypeService.get({
    params: {
      category_id
    }
  })

export const getProblemTypeById = (problem_id: number) =>
  ProblemTypeService.get({ params: { problem_id } })

export const createProblemType = (payload: ProblemTypePayload) =>
  ProblemTypeService.post({
    data: payload
  })

export const updateProblemType =
  (id: number) => (payload: ProblemTypePayload) =>
    ProblemTypeService.put({
      url: ProblemTypeService.newUrl(`/${id}`),
      data: payload
    })

export const deleteProblemType = (id: number) =>
  ProblemTypeService.delete({
    url: ProblemTypeService.newUrl(`/${id}`)
  })
