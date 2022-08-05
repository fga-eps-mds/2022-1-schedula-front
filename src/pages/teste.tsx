import { ReactNode, useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

import {
  DataCategory,
  DataProbType,
} from '@components/DataType';
import { ModalEditType } from '@components/ModalEditType';
import { listcategory } from '@services/testApi';

import DefaultLayout from '../layout/DefaultLayout';

const Teste = () => {
  const [categorias, setCategorias] = useState<
    DataCategory[]
  >([]);

  useEffect(() => {
    listcategory
      .get('/users')
      .then((res) => {
        setCategorias(res.data);
      })
      .catch();
  }, []);

  function EditCategory(categoria2: DataProbType) {
    setCategorias(
      categorias.map((categoria) =>
        categoria.id === categoria2.id
          ? {
              ...categoria,
              name: categoria2.name,
              description: categoria2.description,
            }
          : { ...categoria }
      )
    );
  }

  return (
    <>
      <Heading w='100%'>Página Teste</Heading>
      <Box mt='1em' mb='3em'>
        <Text>Tipos cadastrados no sitema.</Text>
        {
          //o map só pode listar se tiver com o active == true, não faz isso agora pq a api não existe.
        }
        {categorias?.map((categoria: DataCategory) => {
          // categoria.active === true ?
          return (
            <>
              <Text>{categoria.name}</Text>
              <Text>{categoria.description}</Text>
              <ModalEditType
                callBack={EditCategory}
                categoryId={categoria.id}
                id={categoria.id}
              />
            </>
          );
        })}
      </Box>
    </>
  );
};

Teste.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout Active='dashboard'>{page}</DefaultLayout>
  );
};

export default Teste;
