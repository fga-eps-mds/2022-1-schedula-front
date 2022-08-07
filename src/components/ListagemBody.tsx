import { CommonData } from './DataType';
import { ListItem } from './ListItem';

interface ListagemBodyProps {
  data: CommonData[];
  noAdd?: boolean;
  Edit: (data: CommonData) => void;
  Del: (delid: number) => void;
}

export const ListagemBody = ({ data, noAdd, Edit, Del }: ListagemBodyProps) => {
  return (
    <>
      {data?.map((item: CommonData) => {
        return (
          <ListItem
            key={item.id}
            noAdd={noAdd}
            callBackEdit={Edit}
            callBackDel={Del}
            {...item}
          />
        );
      })}
    </>
  );
};
