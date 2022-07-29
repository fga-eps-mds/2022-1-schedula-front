import { ReactElement, ReactNode, useEffect } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';

import { testApi } from '@services/testApi';

import { ColorTheme } from '../styles/ColorTheme';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

//setando layout default
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

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
