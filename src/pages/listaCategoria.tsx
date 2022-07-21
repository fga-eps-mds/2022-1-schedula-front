import { ReactNode } from 'react';

import DefaultLayout from '../layout/DefaultLayout';

const listaCategoria = () => {
  return (
    <>
      <h1 style={{ width: '100%' }}>Hello World</h1>
    </>
  );
};
listaCategoria.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default listaCategoria;
