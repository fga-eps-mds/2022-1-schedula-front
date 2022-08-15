import type { AppProps } from 'next/app';
import { Slide, ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultLayout } from 'layout/DefaultLayout';
import { SWRConfig, SWRConfiguration } from 'swr';

import { ColorTheme } from '../styles/ColorTheme';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const swrConfig: SWRConfiguration = {
  revalidateOnFocus: process.env.NODE_ENV !== 'development',
  shouldRetryOnError: false,
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <ChakraProvider resetCSS theme={ColorTheme}>
      <SWRConfig value={swrConfig}>
        {getLayout(<Component {...pageProps} />)}
      </SWRConfig>
      <ToastContainer
        position='bottom-right'
        hideProgressBar
        transition={Slide}
      />
    </ChakraProvider>
  );
}

export default MyApp;
