import { ChamadoPriority, ChamadoStatus } from "@constants/Chamados"

export const formValuesToPayload = (
  values: ChamadoFormValues
): ChamadoPayload => ({
  ...values,
  city_id: Number(values?.city_id?.value),
  workstation_id: Number(values?.workstation_id?.value),
  problems: values.problems.map((problem) => ({
    ...problem,
    category_id: Number(problem?.category_id?.value),
    problem_id: Number(problem?.problem_id?.[0]?.value),
    request_status: problem.request_status.value,
    priority: problem?.priority?.value
  }))
})

export const chamadoToFormValues = (
  chamado: Chamado
): ChamadoFormValues & { id: number } => ({
  ...chamado,
  city_id: {
    value: chamado.city_id,
    label: ""
  },
  workstation_id: {
    value: chamado.workstation_id,
    label: ""
  },
  problems: chamado.problems.map((problem) => ({
    ...problem,
    event_date: problem.event_date ? new Date(problem.event_date) : undefined,
    alert_dates: problem.alert_dates?.map?.((date) => new Date(date)) ?? [],
    category_id: {
      value: problem.category_id,
      label: problem.category.name
    },
    problem_id: [
      {
        value: problem.problem_id,
        label: problem.problem.name
      }
    ],
    request_status: {
      value: problem.request_status,
      label: ChamadoStatus[problem.request_status]
    },
    priority: {
      value: problem.priority,
      label: ChamadoPriority[problem.priority]
    }
  }))
})
