import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

import DefaultLayout from '../layout/DefaultLayout';

const teste = () => {
  return (
    <>
      <Box>Página Teste</Box>
    </>
  );
};

//Chamado do DefaulLayout
teste.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout Active='dashboard'>{page}</DefaultLayout>
  );
};

export default teste;
