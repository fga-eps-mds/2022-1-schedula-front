import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("NEXTAUTH TOKEN: ", req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        console.log("token: ", token, req)

        return Boolean(token)
      }
    }
  }
)

export const config = { matcher: ["/((?!login|public|static|api|_next).*)"] }
