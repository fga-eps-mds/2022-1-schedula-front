type SignInCredentials = {
  username: string;
  password: string;
};

type SignedUser = {
  id: string;
  name: string;
  token: string;
  email: string;
  // role: string;
  // permissions: Array<string>;
};

type AuthResponse = {
  token: string;
};
