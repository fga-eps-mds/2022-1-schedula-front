type ChamadoFormValues = {
  attendant_name?: string
  applicant_name: string
  applicant_phone: string
  city_id: { label: string; value: number }
  workstation_id: { label: string; value: number }
  problems: ({
    category_id: { label: string; value: number }
    problem_id: { label: string; value: number }
    request_status: { label: string; value: Status }
    priority: { label: string; value: Priority }
    is_event: boolean
  } & ChamadoEvent)[]
}
