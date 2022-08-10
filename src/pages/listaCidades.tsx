import { useEffect, useState } from 'react';

import { addList, delList, editList } from '@components/Cidades/FunctionList';
import { ListagemButtonCad } from '@components/Cidades/ListagemButtonCad';
import { ListItem } from '@components/Cidades/ListItem';
import { DataCity } from '@components/DataType';
import { ListagemHeader } from '@components/ListagemHeader';
import { Loading } from '@components/loading';
import { listCity } from '@services/testApi';

const ListarCidades = () => {
  const [cidades, setCidades] = useState<DataCity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function Del(item: number) {
    setCidades(delList(item, cidades));
  }

  function Edit(item: DataCity) {
    setCidades(editList(item, cidades));
  }

  function Add(item: DataCity) {
    setCidades(addList(item, cidades));
  }

  useEffect(() => {
    listCity
      .get('/users')
      .then((res) => {
        setCidades(res.data);
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Loading isLoading={isLoading}>
        <ListagemHeader
          header='Gerenciar Cidades'
          underHeader='Lista de cidades cadastradas'
        >
          <ListagemButtonCad
            buttonText='Nova Cidade'
            modalHeader={''}
            buttonModal={<>REGISTRAR CIDADE</>}
            api={listCity}
            errorMessage={''}
            successMessage={''}
            tag={'/users'}
            callBack={Add}
          />
        </ListagemHeader>
        {cidades?.map((item: DataCity) => {
          return (
            <ListItem
              noAdd
              api={listCity}
              tag='/users/'
              Edit={Edit}
              modalEditHeader=''
              buttonEditModal={<>ATUALIZAR CIDADE</>}
              errorEditMessage={''}
              successEditMessage={''}
              Del={Del}
              modalDelHeader=''
              firstTextDel=''
              secondTextDel=''
              successDelMessage=''
              errorDelMessage=''
              key={item.id}
              {...item}
            />
          );
        })}
      </Loading>
    </>
  );
};

export default ListarCidades;
