import { UseFormReset } from 'react-hook-form';
import { AxiosInstance } from 'axios';

export type CommonData = {
  id: number;
  name: string;
  description: string;
};

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

export type RequestProps = {
  data: CommonData;
  api: AxiosInstance;
  errorMessage: string;
  successMessage: string;
  tag: string;
  reset: UseFormReset<CommonData>;
  callBack: (data: CommonData) => void;
};
