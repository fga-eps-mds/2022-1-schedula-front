export type DataCategory = {
  id: number;
  name: string;
  description: string;
  active: boolean;
  updated_at: Date;
};

export type DataProbType = {
  id: number;
  name: string;
  description: string;
  active: boolean;
  updated_at: Date;
  category_id: number;
};

export type DataCity = {
  id: number;
  name: string;
  description: string;
  active: boolean;
  updated_at: Date;
};
