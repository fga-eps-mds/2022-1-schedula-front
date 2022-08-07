import { useEffect, useState } from 'react';

import { ListagemBody } from '@components/ListagemBody';
import { ListagemButton } from '@components/ListagemButton';
import { ListagemHeader } from '@components/ListagemHeader';
import { Loading } from '@components/loading';
import { CommonData } from '@services/DataType';
import { addList, delList, editList } from '@services/FunctionList';
import { listCity } from '@services/testApi';

const ListarCidades = () => {
  const [cidades, setCidades] = useState<CommonData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function delListCity(item: number) {
    setCidades(delList(item, cidades));
  }

  function editListCity(item: CommonData) {
    setCidades(editList(item, cidades));
  }

  function addListCity(item: CommonData) {
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
          <ListagemButton buttonText='Nova Cidade'></ListagemButton>
        </ListagemHeader>
        <ListagemBody
          noAdd
          data={cidades}
          Del={delListCity}
          Edit={editListCity}
        />
      </Loading>
    </>
  );
};

export default ListarCidades;
