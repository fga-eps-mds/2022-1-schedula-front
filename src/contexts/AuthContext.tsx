import { createContext, useState } from "react"
import axios from "axios"

type AuthContextType = {
  isAuthenticated: boolean
  credential: string
  value: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [users, setUsers] = useState<AuthContextType[]>([])

  const isAuthenticated = false
  const credential = " "
  const value = " "

  async function singIn() {
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/login")
      .then((usersData) => {
        setUsers(
          usersData.data.data.map((user: AuthContextType) => {
            return {
              credential: user.credential,
              passWord: user.value
            }
          })
        )
      })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, credential, value }}>
      {children}
    </AuthContext.Provider>
  )
}
