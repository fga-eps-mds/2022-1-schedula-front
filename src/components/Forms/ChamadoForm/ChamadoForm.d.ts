type ChamadoFormValues = {
  attendant_name?: string
  applicant_name: string
  applicant_phone: string
  description: string
  place: string
  workstation_id: SelectOption
  problems: {
    category_id: SelectOption
    problem_id: SelectOption
    request_status: { label: string; value: Status }
    priority: { label: string; value: Priority }
    is_event: boolean
    event_date: Date
  }[]
}
