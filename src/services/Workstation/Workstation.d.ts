interface Workstation {
  id: number;
  name: string;
  adsl_vpn: boolean;
  ip: string;
  regional: String;
  city_id: String;
  regional_id: String;
}

interface CreateWorkstationPayload {
  id: number;
  name: string;
  adsl_vpn: boolean;
  ip: string;
  regional: String;
  city_id: String;
  regional_id: String;
}

