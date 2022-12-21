import axios, { AxiosError } from "axios"
import { parseCookies } from "nookies"

import { signOut } from "@contexts/AuthContext"

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_GESTOR_DE_USUARIOS_URL ?? "http://localhost:3001"
})

apiClient.interceptors.request.use((config) => {
  const cookies = parseCookies()
  const token = cookies["schedula.token"]

  if (config && config?.headers && token)
    config.headers.Authorization = `Bearer ${token}`

  return config
})

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      if (typeof window !== undefined) {
        signOut()
      }
    } else {
      return Promise.reject(error)
    }
  }
)
