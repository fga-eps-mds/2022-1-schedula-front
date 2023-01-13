interface City {
  id: number;
  active: boolean;
  updated_at: Date;
  name: string;
}

interface CityPayload {
  name: string;
}
