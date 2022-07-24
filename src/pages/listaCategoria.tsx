import {
  Box,
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';

import DefaultLayout from '../layout/DefaultLayout';

//mudar link para a api do backend, esse é só um link teste.
export const getStaticProps = async () => {
  const url = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  const data = await url.json();
  RiDeleteBin6Line;
  return {
    props: { categorias: data },
  };
};

const listaCategoria = ({ categorias }) => {
  const MenuHeadStyle = {
    width: '60%',
    height: '5%',
    marginTop: '2%',
  };
  return (
    <>
      <div style={{ width: '100%' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            marginTop: '6%',
            fontFamily: 'Overpass ,sans-serif',
          }}>
          <Flex
            align='center'
            justify='left'
            style={MenuHeadStyle}>
            <Heading
              margin='0 auto'
              marginLeft={0}
              size='lg'
              textAlign='center'
              fontFamily='Overpass ,sans-serif'>
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
            _hover={{
              color: 'white',
              bg: 'primary',
              boxShadow: 'xl',
            }}>
            <div style={{ marginTop: '1%' }}>
              NOVA CATEGORIA DE PROBLEMA
            </div>
          </Button>
        </div>
        <div style={{ marginTop: '1em' }}>
          <h2>Categorias cadastradas no sitema.</h2>
          {
            //madar categoria.email para categoria.descrição, o email era só para fim de teste.
          }
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              style={{ marginTop: '2em' }}>
              <Flex w='100%'>
                <Box w='90%'>
                  <h1 style={{ fontSize: 'large' }}>
                    {categoria.name}
                  </h1>
                  <p>{categoria.email}</p>
                </Box>
                <Box m='0 auto' mt='1em' fontSize={'xl'}>
                  <Link href={'/teste'}>
                    <VscAdd color='#405866' />
                  </Link>
                </Box>
                <Box m='0 auto' mt='1em' fontSize={'xl'}>
                  <Link href={'/teste'}>
                    <BiEditAlt />
                  </Link>
                </Box>
                <Box m='0 auto' mt='1em' fontSize={'xl'}>
                  <Link href={'/teste'}>
                    <RiDeleteBin6Line />
                  </Link>
                </Box>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
//Chamado do DefaulLayout
listaCategoria.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout Active='gerenciarTiposDeChamado'>
      {page}
    </DefaultLayout>
  );
};
export default listaCategoria;
