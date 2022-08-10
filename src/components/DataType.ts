import { ReactNode } from 'react';
import { UseFormReset } from 'react-hook-form';
import { AxiosInstance } from 'axios';

type Data = {
  id: number;
  name: string;
  description: string;
};

export type CommonData = Data & {
  parentId: number;
};

export type DataCategory = Data & {
  active?: boolean;
  updated_at?: Date;
};

export type DataProbType = {
  id?: number;
  name: string;
  description: string;
  active?: boolean;
  updated_at?: Date;
  category_id: number;
};

export type DataCity = {
  id: number;
  name: string;
  active?: boolean;
  updated_at?: Date;
};

type RequestProps = {
  api: AxiosInstance;
  errorMessage: string;
  successMessage: string;
  tag: string;
  onClose: () => void;
};

export type RequestDelProps = RequestProps & {
  id: number;
  callBack: (data: number) => void;
};

export type RequestTiposProps = RequestProps & {
  data: CommonData;
  callBack: (data: CommonData) => void;
  reset: UseFormReset<CommonData>;
};

export type RequestCityProps = RequestProps & {
  data: DataCity;
  callBack: (data: DataCity) => void;
  reset: UseFormReset<DataCity>;
};

type ListType = {
  noAdd?: boolean;
  api: AxiosInstance;
  tag: string;
  addTag?: string;
  goTo?: string;
  id: number;
  name: string;

  buttonEditModal: ReactNode;
  modalEditHeader: string;
  errorEditMessage: string;
  successEditMessage: string;

  modalAddHeader?: string;
  buttonAddModal?: ReactNode;
  errorAddMessage?: string;
  successAddMessage?: string;

  firstTextDel: string;
  secondTextDel: string;
  modalDelHeader: string;
  errorDelMessage: string;
  successDelMessage: string;
};

export type ListTiposProps = ListType & {
  description: string;
  Del: (delid: number) => void;
  Add?: (data: CommonData) => void;
  Edit: (data: CommonData) => void;
};

export type ListCityProps = ListType & {
  Del: (delid: number) => void;
  Add?: (data: DataCity) => void;
  Edit: (data: DataCity) => void;
};
