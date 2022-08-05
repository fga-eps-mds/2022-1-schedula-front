import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultLayout } from 'layout/DefaultLayout';

import { testApi } from '@services/testApi';

import { ColorTheme } from '../styles/ColorTheme';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  useEffect(() => {
    testApi.get('/zen').then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <ChakraProvider resetCSS theme={ColorTheme}>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer />
    </ChakraProvider>
  );
}

export default MyApp;
