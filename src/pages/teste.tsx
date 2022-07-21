import { ReactNode } from 'react';

import DefaultLayout from '../layout/DefaultLayout';

const teste = () => {
  return (
    <>
      <h1 style={{ width: '100%' }}>Página Teste</h1>
    </>
  );
};
//Chamado do DefaulLayout
teste.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout isActive1={true}>{page}</DefaultLayout>
  );
};
export default teste;
