import { ReactNode } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

import { ItemCategory } from '../components/ItemCategory';
import DefaultLayout from '../layout/DefaultLayout';

interface Data1 {
  id: number;
  name: string;
  description: string;
  active: boolean;
  updatedAt: Date;
}

//mudar link para a api do backend, esse é só um link teste.

export const getStaticProps = async () => {
  const url = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  const data: Data1[] = await url.json();

  return {
    props: { categorias: data },
  };
};

const listaCategoria = ({
  categorias,
}: {
  categorias: Data1[];
}) => {
  return (
    <>
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
          <Button
            bg={'primary'}
            color={'white'}
            margin={'0 auto'}
            boxShadow={'dark-lg'}
            marginTop={'1em'}
            borderRadius={'90px'}
            h={'2em'}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- its necessary since _hover NEEDS a css style object
            _hover={{
              color: 'white',
              bg: 'primary',
              boxShadow: 'xl',
            }}
          >
            <Text mt='0.25em' noOfLines={1}>
              NOVA CATEGORIA DE PROBLEMA
            </Text>
          </Button>
        </Box>
        <Box mt='1em' mb='3em'>
          <Text>Categorias cadastradas no sitema.</Text>
          {
            //madar categoria.email para categoria.descrição, o email era só para fim de teste.
          }
          {categorias.map((categoria: Data1) => {
            const link = '/teste';

            return (
              <ItemCategory
                key={categoria.id}
                linkAdd={link}
                linkEdit={link}
                linkDel={link}
                {...categoria}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
};

listaCategoria.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout Active='gerenciarTiposDeChamado'>
      {page}
    </DefaultLayout>
  );
};

export default listaCategoria;
