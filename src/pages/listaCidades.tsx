import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { CommonData } from '@components/DataType';
import { addList } from '@components/FunctionList';
import { ListagemHeader } from '@components/ListagemHeader';
import { Loading } from '@components/loading';
import { ModalCadCategory } from '@components/ModalCadCategory';
import { listCity } from '@services/testApi';

const ListarCidades = () => {
  const [cidades, setCidades] = useState<CommonData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          header='Gerenciar Categoria de Problema'
          underHeader='Lista De Categorias cadastradas'
        >
          <ModalCadCategory callBack={addListCity} />
        </ListagemHeader>
        <Box>oi</Box>
      </Loading>
    </>
  );
};

export default ListarCidades;
