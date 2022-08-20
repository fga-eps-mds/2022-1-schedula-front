interface Workstation {
  id: number;
  name: string;
  adsl_vpn: boolean;
  ip: string;
  regional: Column;
  city_id: Column;
  regional_id: Column;
}

interface IProblemWorkstationPayload {
  name: string;
  ip: string;
}
