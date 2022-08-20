import { toast } from "react-toastify"
import axios from "axios"

const usuariosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GESTOR_DE_USUARIOS_URL
})

const detalhadorApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DETALHADOR_CHAMADOS_URL
})

//Adicionar a PUBLIC API das Cidades.
const cidadesApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GERENCIADOR_DE_LOCALIDADES_URL
})

export const errorResponseHandler = (error: any) => {
  if (error?.response) {
    if (typeof error?.response?.data === "string") {
      return Promise.reject(new Error(error.response.data))
    }

    if (typeof error?.response?.data?.message === "string") {
      return Promise.reject(new Error(error.response.data.message))
    }

    return Promise.reject(
      new Error("Something went wrong", {
        cause: error.response
      })
    )
  }

  if (error?.request) {
    console.error("INTERNAL SERVER ERROR: ", error?.toJSON?.())

    toast.error("Internal Server Error", {
      containerId: "fetch-error",
      toastId: "internal-server-error"
    })

    return Promise.reject(new Error("Internal server error"))
  }

  return Promise.reject(error)
}

// api.defaults.withCredentials = true;

usuariosApi.interceptors.response.use(
  (response) => response,
  errorResponseHandler
)

detalhadorApi.interceptors.response.use(
  (response) => response,
  errorResponseHandler
)

cidadesApi.interceptors.response.use(
  (response) => response,
  errorResponseHandler
)

export { cidadesApi, detalhadorApi, usuariosApi }
