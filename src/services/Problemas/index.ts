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

export const createProblemType = ProblemTypeService.post<ProblemTypePayload>

export const updateProblemType = ProblemTypeService.put<ProblemTypePayload>

export const deleteProblemType = ProblemTypeService.delete
