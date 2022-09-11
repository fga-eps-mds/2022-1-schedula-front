type Access = "basic" | "manager" | "admin"

interface User {
  username: string
  email: string
  name: string
  active: boolean
  acess: Access // NOTE: fix 'acess' typo on backend
  job_role: string
}

interface LoggedUser {
  username: string
  name: string
  job_role: string
  access: strings
}

interface RegisterUserPayload {
  username: string
  email: string
  name: string
  acess: Access
  job_role: string
  password: string
  confirmPassword: string
}

interface CredentialUser {
  username: string
  password: string
}

interface CredentialUserPayload {
  credential: string
  value: string
}
