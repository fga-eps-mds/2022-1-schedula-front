interface Chamado {
  id: number
  attendant_name: string
  applicant_name: string
  applicant_phone: string
  description: string
  place: string
  workstation_id: number
  created_at: Date
  problems: ChamadoProblem[]
}

interface ChamadoProblem {
  category_id: number
  problem_id: number
  request_status: Status
  priority: Priority
  problem: TipoProblema
  category: Category
  is_event: boolean
  event_date: Date
}

interface ChamadoPayload {
  attendant_name?: string
  applicant_name: string
  applicant_phone: string
  description: string
  place: string
  workstation_id: number
  problems: ChamadoProblemPayload[]
}

type ChamadoProblemPayload = {
  category_id: number
  problem_id: number
  request_status: Status
  priority: Priority
  is_event: boolean
  event_date: Date
}

type Status = "pending" | "in_progress" | "not_solved" | "outsourced" | "solved"

type Priority = "low" | "normal" | "high" | "urgent"
