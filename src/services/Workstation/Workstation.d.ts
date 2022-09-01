interface Workstation {
  id: number
  name: string
  asdl_vpn: boolean
  ip: string | null
  link: string | null
  city_id: number
  phone: string[]
  regional: boolean
  regional_id: number
  active: boolean
}

interface CreateWorkstationPayload {
  name: string
  adsl_vpn: boolean
  ip: string | null
  link: string | null
  phone: string[]
  regional: boolean
  city_id: number
  regional_id?: number
}
