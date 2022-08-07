import { useEffect, useState } from 'react';

import { ListagemBody } from '@components/ListagemBody';
import { ListagemButtonCad } from '@components/ListagemButtonCad';
import { ListagemHeader } from '@components/ListagemHeader';
import { Loading } from '@components/loading';
import { CommonData } from '@services/DataType';
import { addList, delList, editList } from '@services/FunctionList';
import { listCity } from '@services/testApi';

const ListarCidades = () => {
  const [cidades, setCidades] = useState<CommonData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function Del(item: number) {
    setCidades(delList(item, cidades));
  }

  function Edit(item: CommonData) {
    setCidades(editList(item, cidades));
  }

  function Add(item: CommonData) {
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
        <ListagemBody
          noAdd
          api={listCity}
          tag='/users/'
          data={cidades}
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
        />
      </Loading>
    </>
  );
};

export default ListarCidades;
