import { ReactNode } from 'react';
import { Heading } from '@chakra-ui/react';

import DefaultLayout from '../layout/DefaultLayout';

const teste = () => {
  return (
    <>
      <Heading w='100%'>Página Teste</Heading>
    </>
  );
};

teste.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout Active='dashboard'>{page}</DefaultLayout>
  );
};

export default teste;
