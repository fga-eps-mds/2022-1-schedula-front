import { useEffect, useState } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';

import { CommonData } from '@components/DataType';
import { addList } from '@components/FunctionList';
import { ListagemButton } from '@components/ListagemButton';
import { ListagemHeader } from '@components/ListagemHeader';
import { Loading } from '@components/loading';
import { ModalCadType } from '@components/ModalCadType';
import { listCity } from '@services/testApi';

const ListarCidades = () => {
  const [cidades, setCidades] = useState<CommonData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <ListagemButton onOpen={onOpen} buttonText='Nova Cidade'>
            <ModalCadType
              isOpen={isOpen}
              onClose={onClose}
              categoryId={2}
              callBack={addListCity}
            />
          </ListagemButton>
        </ListagemHeader>
        <Box>oi</Box>
      </Loading>
    </>
  );
};

export default ListarCidades;
