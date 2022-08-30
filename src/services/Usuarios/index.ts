import { Services } from "@services"

const UserService = Services.usuarios.create("/user")

export const getUsers = UserService.get()

export const getUserById = (id: number) => UserService.get({ params: { id } })

export const createUser = UserService.post<RegisterUserPayload>

export const updateUser = UserService.put<RegisterUserPayload>

export const deleteUser = UserService.delete
