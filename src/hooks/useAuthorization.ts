import { useMemo } from "react"
import { useSession } from "next-auth/react"

export function useAuthorization(access?: Access[]): boolean {
  const { data: session } = useSession()

  const isAuthorized = useMemo(() => {
    if (session?.user?.access === "admin") return true

    return access?.includes(session?.user?.access) || false
  }, [access, session])

  return isAuthorized
}
