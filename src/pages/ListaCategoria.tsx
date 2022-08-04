import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react';

import { DataCategory } from '@components/DataType';
import { listcategory } from '@services/testApi';

import { ItemCategory } from '../components/ItemCategory';
import { ModalCadCategory } from '../components/ModalCadCategory';

type FormProps = {
  id: number;
  name: string;
  description: string;
};

const ListaCategoria = () => {
  const [categorias, setCategorias] = useState<
    DataCategory[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function AddCategory(categoria: DataCategory) {
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

  function DelCategory(delid: number) {
    setCategorias(categorias.filter((categoria) => categoria.id !== delid));
  }

  useEffect(() => {
    listcategory
      .get('/users')
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
        <Box
          w={'100%'}
          verticalAlign={'90px'}
          alignContent={'center'}
          justifyContent={'center'}
          alignItems={'center'}
          margin={'0 auto'}
        >
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            mt={'30%'}
            ml={'40%'}
          />
        </Box>
      ) : (
        <Box w='100%'>
          <Box
            width='100%'
            display='flex'
            marginTop='6%'
            fontFamily='Overpass ,sans-serif'
          >
            <Flex align='center' justify='left' w='60%' h='5%' mr={10} mt='2%'>
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
              //o map só pode listar se tiver com o active == true, não faz isso agora pq a api não existe.
            }
            {categorias?.map((categoria: DataCategory) => {
              // categoria.active === true ?
              return (
                <ItemCategory
                  key={categoria.id}
                  callBackEdit={EditCategory}
                  callBackDel={DelCategory}
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

export default ListaCategoria;
