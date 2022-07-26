import DefaultLayout from '../layout/DefaultLayout';

import { Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

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
