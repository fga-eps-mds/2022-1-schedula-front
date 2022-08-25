interface ProblemType {
  id: number
  name: string
  description: string
  active: boolean
  updated_at: Date
}

interface ProblemTypePayload {
  name: string
  description: string
  category_id: number
}
