import { createContext } from 'react';

import type { User } from '../types/user';

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  errorMessage: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
export type { User, AuthContextType };