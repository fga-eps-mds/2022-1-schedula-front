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
  is_event: boolean
  request_status: Status
  priority: Priority
  problem: TipoProblema
  category: CategoriaProblema
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
  is_event: boolean
  request_status: Status
  priority: Priority
}

type Status = "pending" | "in_progress" | "not_solved" | "outsourced" | "solved"

type Priority = "low" | "normal" | "high" | "urgent"
