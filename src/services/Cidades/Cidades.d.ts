interface ICity {
  id: number
  active: boolean
  updated_at: Date
  name: string
}

interface ICityPayload {
  name: string
}
