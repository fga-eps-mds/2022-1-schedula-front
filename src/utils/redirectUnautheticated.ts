import { useEffect } from "react"
import { NextRouter } from "next/router"
import { useSession } from "next-auth/react"

export function RedirectUnauthenticated(router: NextRouter) {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [router, status])

  return session
}
