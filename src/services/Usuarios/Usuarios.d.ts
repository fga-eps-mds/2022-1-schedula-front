type Accesses = 'basic' | 'manager' | 'admin';

interface User {
  username: string;
  email: string;
  name: string;
  active: boolean;
  acess: Accesses; // todo: fix on backend
  job_role: string;
}

interface CreateUserPayload {
  username: string;
  email: string;
  name: string;
  acess: Accesses;
  job_role: string;
  password: string;
  confirmPassword: string;
}
