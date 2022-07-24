import { Button, Flex, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

import DefaultLayout from '../layout/DefaultLayout';

const listaCategoria = () => {
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
            <div style={{ marginTop: '3px' }}>
              NOVA CATEGORIA DE PROBLEMA
            </div>
          </Button>
        </div>
        <div style={{ marginTop: '2em' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Maecenas Lorem ipsum dolor sit amet...
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
