import { useMemo } from "react"
import { useSession } from "next-auth/react"

export function useAuthorization(access?: Access[]) {
  const { data: session, status } = useSession()

  const isAuthorized = useMemo(() => {
    if (session?.user?.access === "admin") return true

    return access?.includes(session?.user?.access)
  }, [access, session])

  return { isAuthorized, status }
}
