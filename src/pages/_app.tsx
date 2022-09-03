import type { AppProps } from "next/app"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import NextNprogress from "nextjs-progressbar"
import { Slide, ToastContainer } from "react-toastify"
import { ChakraProvider } from "@chakra-ui/react"
import { DefaultLayout } from "layout/DefaultLayout"
import { SWRConfig, SWRConfiguration } from "swr"

import { ColorTheme } from "../styles/theme"

import "react-toastify/dist/ReactToastify.css"

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  pageProps: { session: Session; pageProps: unknown }
}

const swrConfig: SWRConfiguration = {
  revalidateOnFocus: process.env.NODE_ENV !== "development",
  shouldRetryOnError: false
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <SessionProvider session={session}>
      <ChakraProvider resetCSS theme={ColorTheme}>
        <SWRConfig value={swrConfig}>
          <NextNprogress
            color="linear-gradient(
            to right,
                #fdd017,
                #FF8520,
                #EB6A00,
                #e84049
                )"
            startPosition={0.75}
            stopDelayMs={50}
            height={3}
          />
          {getLayout(<Component {...pageProps} />)}
        </SWRConfig>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          transition={Slide}
        />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
