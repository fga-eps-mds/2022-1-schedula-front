import type { AppProps } from "next/app"
import Head from "next/head"
import NextNprogress from "nextjs-progressbar"
import { Slide, ToastContainer } from "react-toastify"
import { ChakraProvider } from "@chakra-ui/react"
import { DefaultLayout } from "layout/DefaultLayout"
import { SWRConfig, SWRConfiguration } from "swr"

import { AuthProvider } from "@contexts/AuthContext"

import { theme } from "@styles/theme"
import "react-toastify/dist/ReactToastify.css"
import "@styles/react-datepicker.scss"

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithProps
  pageProps: { pageProps: unknown }
}

const swrConfig: SWRConfiguration = {
  revalidateOnFocus: process.env.NODE_ENV !== "development",
  shouldRetryOnError: false
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <AuthProvider>
      <ChakraProvider resetCSS theme={theme}>
        <SWRConfig value={swrConfig}>
          <NextNprogress
            color="linear-gradient(
            to right,
                #fdd017,
                #FF8520,
                #EB6A00,
                #e84049
                )"
            startPosition={0.2}
            stopDelayMs={100}
            height={3}
          />
          <Head>
            <title>Schedula</title>
          </Head>
          {getLayout(<Component {...pageProps} />)}
        </SWRConfig>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          autoClose={3000}
          transition={Slide}
        />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
