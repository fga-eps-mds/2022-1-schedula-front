interface IProblemCategory {
  id: number
  active: boolean
  description: string
  updated_at: Date
  name: string
}

interface IProblemCategoryPayload {
  name: string
  description: string
}

type DetalhadorStatus = {
  APP: "Detalhador de chamados is running"
}
