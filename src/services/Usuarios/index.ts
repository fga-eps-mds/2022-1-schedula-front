import { Services } from "@services"

const UserService = Services.usuarios.create("/user")

export const getUsers = UserService.get()

export const getUserById = (id: number) => UserService.get({ params: { id } })

export const createUser = (payload: RegisterUserPayload) =>
  UserService.post({
    data: payload
  })

export const updateUser =
  (username: string) => (payload: RegisterUserPayload) =>
    UserService.put({
      url: UserService.newUrl(`/${username}`),
      data: payload
    })

export const deleteUser = (username: string) =>
  UserService.delete({
    url: UserService.newUrl(`/${username}`)
  })
