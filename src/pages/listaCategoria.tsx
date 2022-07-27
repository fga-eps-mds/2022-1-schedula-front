import { ReactNode } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { ItemCategory } from '../components/ItemCategory';
import { ModalCad } from '../components/ModalCad';
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
            mr={10}
            mt='2%'>
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
          <ModalCad />
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
