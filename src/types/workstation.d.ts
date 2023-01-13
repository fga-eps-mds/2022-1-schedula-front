interface Workstation {
  id: number;
  name: string;
  adsl_vpn: boolean;
  ip: string | null;
  link: string | null;
  city_id: number;
  phones: string[];
  regional: boolean;
  regional_id: number;
  active: boolean;
}

interface CreateWorkstationPayload {
  name: string;
  adsl_vpn: boolean;
  ip: string | null;
  link: string | null;
  phones: string[];
  regional: boolean;
  city_id: number;
  regional_id?: number;
}
