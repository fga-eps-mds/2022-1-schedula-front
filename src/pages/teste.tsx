import { Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

import DefaultLayout from '../layout/DefaultLayout';

const teste = () => {
  return (
    <>
      <Heading w='100%'>Página Teste</Heading>
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
