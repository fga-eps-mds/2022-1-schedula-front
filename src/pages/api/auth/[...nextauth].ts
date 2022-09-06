import { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { CallbacksOptions, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt from "jsonwebtoken"

import { api } from "@services/api"
import { loginUser } from "@services/Usuarios"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username"
        },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        let response

        try {
          if (credentials?.username && credentials.password) {
            response = await api.request(
              loginUser({
                credential: credentials.username,
                value: credentials.password
              })
            )
            const cookies = response.headers["set-cookie"]
            let token

            if (cookies) {
              res.setHeader("Set-Cookie", cookies)
              api.defaults.headers.common.Cookie =
                cookies[0] || (cookies as unknown as string)

              token = cookies[0].split(";")[0].split("=")[1] // NAO RELE A MAO NESTA GAMBIARRA
            }

            if (response.data.error === null) {
              console.log(token)

              const user = jwt.verify(
                token as string,
                process.env.SECRET as string
              ) as LoggedUser

              return { ...user, token }
            }
          }

          return null
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- era p unico jeito
          throw new Error(error as any)
        }
      }
    })
  ]

  const callbacks: Partial<CallbacksOptions> = {
    async jwt({ token, user }) {
      console.log("jwt", token, user)

      if (user) {
        token.accessToken = user.token
      }

      return token
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      // Allows relative callback URLs
      if (url.startsWith("/")) return new URL(url, baseUrl).toString()

      return baseUrl
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = jwt.verify(
        token.accessToken as string,
        process.env.SECRET as string
      ) as LoggedUser

      return session
    }
  }

  const options: NextAuthOptions = {
    providers,
    callbacks,
    pages: {
      error: "/login",
      signIn: "/login"
    }
  }

  return await NextAuth(req, res, options)
}
