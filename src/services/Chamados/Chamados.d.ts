interface Chamado {
  id: number
  attendant_name: string
  applicant_name: string
  applicant_phone: string
  description: string
  place: string
  workstation_id: number
  created_at: Date
  problems: [ChamadoProblem & { request_id: number }]
}

interface ChamadoPayload {
  attendant_name?: string
  applicant_name: string
  applicant_phone: string
  description: string
  place: string
  workstation_id: number
  problems: ChamadoProblem[]
}

type ChamadoProblem = {
  category_id: number
  problem_id: number
  is_event: false
  request_status: Status
  priority: Priority
}

type Status = "pending" | "in_progress" | "not_solved" | "outsourced" | "solved"

type Priority = "low" | "normal" | "high" | "urgent"
