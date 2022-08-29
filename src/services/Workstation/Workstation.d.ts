interface Workstation {
  id: number
  name: string
  asdl_vpn: boolean
  ip: string | null
  link: string | null
  city_id: number
  regional: boolean
  regional_id: number
  active: boolean
}

interface CreateWorkstationPayload {
  id: number
  name: string
  adsl_vpn: boolean
  ip: string | null
  link: string | null
  regional: boolean
  city_id: number
  regional_id: number
}
