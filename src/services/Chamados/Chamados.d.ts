interface Chamado {
  id: number
  attendant_name: string
  applicant_name: string
  applicant_phone: string
  city_id: number
  workstation_id: number
  created_at: Date
  problems: ChamadoProblem[]
}

type ChamadoProblem = {
  category_id: number
  problem_id: number
  request_status: Status
  priority: Priority
  problem: TipoProblema
  category: Category
  is_event: boolean
} & ChamadoEvent

interface ChamadoEvent {
  is_event: true
  event_date?: Date
  alert_date?: Date[]
  description?: string
}

interface ChamadoPayload {
  attendant_name?: string
  applicant_name: string
  applicant_phone: string
  city_id: number
  workstation_id: number
  problems: ChamadoProblemPayload[]
}

type ChamadoProblemPayload = {
  category_id: number
  problem_id: number
  request_status: Status = "solved"
  priority: Priority
  is_event: boolean
  event_date?: Date
  description?: string
}

type Status = "pending" | "in_progress" | "not_solved" | "outsourced" | "solved"

type Priority = "low" | "normal" | "high" | "urgent"
