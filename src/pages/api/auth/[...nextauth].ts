import { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

import { request } from "@services/request"
import { loginUser } from "@services/Usuarios"

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      credentials: { label: "Username", type: "text " },
      value: { label: "Password", type: "password" }
    },
    authorize: async (credentials: any) => {
      const response = await request(loginUser(credentials))

      if (response.type === "success") {
        const user = {}

        return user
      } else {
        return null
      }
    }
  })
]

const callbacks = {
  // Getting the JWT token from API response
  async jwt(token: JWT, user: User) {
    if (user) {
      token.accessToken = user.token
    }

    return token
  },

  async session(session: Session, token: JWT) {
    session.accessToken = token.accessToken

    return session
  }
}

const options = {
  providers,
  callbacks
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
