interface CategoriaProblema {
  id: number
  active: boolean
  description: string
  updated_at: Date
  name: string
}

interface CategoriaProblemaPayload {
  name: string
  description: string
}

type DetalhadorStatus = {
  APP: "Detalhador de chamados is running"
}
