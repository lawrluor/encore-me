import { createContext } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  errorMessage: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
export type { User, AuthContextType };