type ChamadoFormValues = {
  attendant_name?: string
  applicant_name: string
  applicant_phone: string
  city_id: SelectOption | null
  workstation_id: SelectOption | null
  problems: ({
    category_id: SelectOption | null
    problem_id: SelectOption | null
    request_status: SelectOption<Status>
    priority: SelectOption<Priority>
    is_event: boolean
  } & Omit<ChamadoEvent, "is_event">)[]
}

type SelectOption<Value = number> = {
  label: string
  value: Value
}
