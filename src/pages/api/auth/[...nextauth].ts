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
                username: credentials.username,
                password: credentials.password
              })
            )
            const cookies = response.headers["set-cookie"]

            if (cookies) {
              res.setHeader("Set-Cookie", cookies)
              console.log("3 log:", cookies[0])
              api.defaults.headers.common.Cookie =
                cookies[0] || (cookies as unknown as string)

              const authToken = cookies[0] //.split("")[0].split("=")[1]

              const user = jwt.verify(
                authToken,
                process.env.NEXTAUTH_SECRET as string
              ) as LoggedUser

              return { ...user } ?? null
            }
          }

          return null
        } catch (error) {
          console.log("AUTHORIZE ERROR: ", error)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- era p unico jeito
          throw new Error(error as any)
        }
      }
    })
  ]

  const callbacks: Partial<CallbacksOptions> = {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
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
      console.log("SESSION: ", session, token)

      session.user = token.user as LoggedUser
      session.user.access = token.access

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
