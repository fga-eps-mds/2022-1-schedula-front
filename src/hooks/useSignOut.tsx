import { useCallback } from "react"
import { useRouter } from "next/router"
import { signOut as nextAuthSignOut } from "next-auth/react"

export const useSignOut = () => {
  const router = useRouter()

  const signOut = useCallback(async () => {
    try {
      const data = await nextAuthSignOut({
        redirect: false,
        callbackUrl: "/login"
      })

      if (router?.query?.callbackUrl) {
        router.push({
          pathname: "/login",
          query: { callbackUrl: router?.query?.callbackUrl }
        })
      } else {
        router.push(data?.url)
      }
    } catch (error) {
      console.error("Sign out error: ", error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ignore router
  }, [])

  return signOut
}
