import { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { CallbacksOptions, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt from "jsonwebtoken"

import { request } from "@services/request"
import { loginUser } from "@services/Usuarios"

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      credentials: { label: "Username", type: "text " },
      value: { label: "Password", type: "password" }
    },
    authorize: async (credentials) => {
      let response

      try {
        if (credentials?.credentials && credentials.value) {
          response = await request(
            loginUser({
              credential: credentials.credentials,
              value: credentials.value
            })
          )

          if (response.type === "success") {
            const token = response.value.data
            const user = jwt.verify(
              token as string,
              process.env.SECRET as string
            ) as LoggedUser

            return { ...user, token }
          }
        }

        return null
      } catch (error) {
        throw new Error()
      }
    }
  })
]

const callbacks: Partial<CallbacksOptions> = {
  async jwt({ token, user }) {
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

// eslint-disable-next-line import/no-anonymous-default-export -- desabilitando
export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
