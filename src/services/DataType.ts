import { ReactNode } from 'react';
import { UseFormReset } from 'react-hook-form';
import { AxiosInstance } from 'axios';

export type CommonData = {
  id: number;
  name: string;
  description: string;
  parentId: number;
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

export type RequestMainProps = RequestProps & {
  data: CommonData;
  callBack: (data: CommonData) => void;
  reset: UseFormReset<CommonData>;
};

type ListType = {
  noAdd?: boolean;
  api: AxiosInstance;
  tag: string;
  addTag?: string;
  goTo?: string;
  Edit: (data: CommonData) => void;
  buttonEditModal: ReactNode;
  modalEditHeader: string;
  errorEditMessage: string;
  successEditMessage: string;
  Add?: (data: CommonData) => void;
  modalAddHeader?: string;
  buttonAddModal?: ReactNode;
  errorAddMessage?: string;
  successAddMessage?: string;
  Del: (delid: number) => void;
  firstTextDel: string;
  secondTextDel: string;
  modalDelHeader: string;
  errorDelMessage: string;
  successDelMessage: string;
};

export type ListItemProps = ListType & {
  id: number;
  name: string;
  description: string;
};

export type ListagemBodyProps = ListType & {
  data: CommonData[];
};
