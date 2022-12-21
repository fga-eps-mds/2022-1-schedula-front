import { createContext, ReactNode, useContext, useState } from "react"
import Router from "next/router"
import { toast } from "react-toastify"
import { destroyCookie, setCookie } from "nookies"

import { apiClient } from "@services/apiClient"

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user: SignedUser
}

const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

const FAKE_USER_DATA = {
  id: "1",
  name: "Usuário",
  role: "admin",
  permissions: ["all"]
}

// let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, "schedula.token")

  // authChannel.postMessage("signOut")

  Router.push("/login")
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SignedUser>({} as SignedUser)
  const isAuthenticated = !!user?.token

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     authChannel = new BroadcastChannel("schedula.auth")

  //     authChannel.onmessage = (message) => {
  //       if (message.data === "signOut") {
  //         signOut()
  //       }
  //     }
  //   }
  // }, [])

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await apiClient.post<AuthResponse>(
        "https://schedula-user.herokuapp.com/auth",
        {
          username,
          password
        }
      )

      const { token } = response?.data

      setCookie(undefined, "schedula.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/"
      })

      setUser({ ...FAKE_USER_DATA, token })

      Router.push("/chamados")
    } catch (err) {
      toast.error(
        "Não foi possível realizar o login! Verifique o email e a senha e tente novamente."
      )
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}
