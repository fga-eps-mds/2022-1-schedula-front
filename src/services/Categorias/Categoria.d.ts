interface Category {
  id: number
  active: boolean
  description: string
  updated_at: Date
  name: string
}

interface CategoryPayload {
  name: string
  description: string
}
