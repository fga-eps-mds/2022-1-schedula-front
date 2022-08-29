import { services } from "@services"

const resourceURL = "/user"
const userService = services.usuarios(resourceURL)

export const getUsers = userService()

export const createUser = (payload: RegisterUserPayload) =>
  userService({
    method: "post",
    data: payload
  })

export const updateUser =
  (username: string) => (payload: RegisterUserPayload) =>
    userService({
      url: resourceURL + `/${username}`,
      method: "put",
      data: payload
    })

export const deleteUser = (username: string) =>
  userService({
    url: resourceURL + `/${username}`,
    method: "delete"
  })
