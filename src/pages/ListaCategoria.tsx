import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';

import { listcategory } from '@services/testApi';

import { ItemCategory } from '../components/ItemCategory';
import { ModalCadCategory } from '../components/ModalCadCategory';
import DefaultLayout from '../layout/DefaultLayout';

export interface Data1 {
  id: number;
  name: string;
  description: string;
  active: boolean;
  updatedAt: Date;
}

type FormProps = {
  id: number;
  name: string;
  description: string;
};

const ListaCategoria = () => {
  const [categorias, setCategorias] = useState<Data1[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function AddCategory(categoria: Data1) {
    setCategorias([categoria, ...categorias]);
  }

  function EditCategory(categoria2: FormProps) {
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

  useEffect(() => {
    listcategory
      .get('/Categories')
      .then((res) => {
        setCategorias(res.data);
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      ) : (
        <Box w='100%'>
          <Box
            width='100%'
            display='flex'
            marginTop='6%'
            fontFamily='Overpass ,sans-serif'
          >
            <Flex
              align='center'
              justify='left'
              w='60%'
              h='5%'
              mr={10}
              mt='2%'
            >
              <Heading
                margin='0 auto'
                marginLeft={0}
                size='lg'
                textAlign='center'
                fontFamily='Overpass ,sans-serif'
              >
                Gerenciar Categoria De Problema
              </Heading>
            </Flex>
            <ModalCadCategory callBack={AddCategory} />
          </Box>
          <Box mt='1em' mb='3em'>
            <Text>Categorias cadastradas no sitema.</Text>
            {
              //madar categoria.email para categoria.descrição, o email era só para fim de teste.
            }
            {categorias?.map((categoria: Data1) => {
              return (
                <ItemCategory
                  key={categoria.id}
                  callBackEdit={EditCategory}
                  {...categoria}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
};

ListaCategoria.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout Active='gerenciarTiposDeChamado'>
      {page}
    </DefaultLayout>
  );
};

export default ListaCategoria;
