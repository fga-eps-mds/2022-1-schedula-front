import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { GetUserInfoResponse } from '@/features/users/api/types';

interface AuthContextData {
  signOut(): void;
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: SignedUser | null;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<SignedUser | null>({} as SignedUser);
  const isAuthenticated = !!user?.token;

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      try {
        const response = await api.post<AuthResponse>(
          'https://schedula-user.herokuapp.com/auth',
          {
            username,
            password,
          }
        );

        const { token } = response.data;

        localStorage.setItem('@schedula:token', token);

        const res = await api.get<GetUserInfoResponse>(
          `${import.meta.env.VITE_PUBLIC_GESTOR_DE_USUARIOS_URL}/auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { username: name, email, userId: id } = res.data;

        setUser({ name, email, id, token });

        const from = location.state?.from?.pathname || '/';

        navigate(from, { replace: true });
      } catch (err) {
        toast.error(
          'Não foi possível realizar o login! Verifique o email e a senha e tente novamente.'
        );
      }
    },
    [navigate, location.state?.from?.pathname]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@schedula:token');

    setUser(null);

    navigate('/login');
  }, [navigate]);

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      isAuthenticated,
      user,
    }),
    [signIn, signOut, isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
