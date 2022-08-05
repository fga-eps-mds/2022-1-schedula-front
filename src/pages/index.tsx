import React from 'react';

import Cadastro from './cadastro';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Cadastro></Cadastro>
    </>
  );
};

Home.getLayout = (page) => {
  return page;
};

export default Home;
