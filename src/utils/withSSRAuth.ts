import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from "next"
import { parseCookies } from "nookies"

export function withSSRAuth<P extends { [key: string]: unknown }>(
  fn: GetServerSideProps<P>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (!cookies["schedula.token"]) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      }
    }

    return await fn(ctx)
  }
}
