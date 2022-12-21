type SignInCredentials = {
  username: string
  password: string
}

type SignedUser = {
  id: string
  name: string
  token: string
  role: string
  permissions: Array<string>
}

type AuthResponse = {
  token: string
}
