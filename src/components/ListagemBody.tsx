import { ReactNode } from 'react';
import { AxiosInstance } from 'axios';

import { CommonData } from '../services/DataType';

import { ListItem } from './ListItem';

interface ListagemBodyProps {
  data: CommonData[];
  noAdd?: boolean;
  api: AxiosInstance;
  tag: string;
  modalEditHeader: string;
  buttonEditModal: ReactNode;
  errorEditMessage: string;
  successEditMessage: string;
  Edit: (data: CommonData) => void;
  modalAddHeader?: string;
  buttonAddModal?: ReactNode;
  errorAddMessage?: string;
  successAddMessage?: string;
  Add?: (data: CommonData) => void;
  Del: (delid: number) => void;
}

export const ListagemBody = ({ ...props }: ListagemBodyProps) => {
  return (
    <>
      {props.data?.map((item: CommonData) => {
        return (
          <ListItem
            key={item.id}
            callBackEdit={props.Edit}
            callBackDel={props.Del}
            callBackAdd={props.Add}
            {...item}
            {...props}
          />
        );
      })}
    </>
  );
};
