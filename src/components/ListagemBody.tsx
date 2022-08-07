import { CommonData, ListagemBodyProps } from '../services/DataType';

import { ListItem } from './ListItem';

export const ListagemBody = ({ ...props }: ListagemBodyProps) => {
  return (
    <>
      {props.data?.map((item: CommonData) => {
        return <ListItem key={item.id} {...item} {...props} />;
      })}
    </>
  );
};
