import { ReactNode } from 'react';

import DefaultLayout from '../layout/DefaultLayout';

const listaCategoria = () => {
  return (
    <>
      <h1 style={{ width: '100%' }}>Hello World</h1>
    </>
  );
};
//Chamado do DefaulLayout
listaCategoria.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout isActive2={true}>{page}</DefaultLayout>
  );
};
export default listaCategoria;
