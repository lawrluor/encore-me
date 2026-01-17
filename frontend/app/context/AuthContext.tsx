import { createContext } from 'react';

type PromotedSet = {
    id: string,
    act_id: string,
    title: string,
    description: string,
}

type User = {
  id: string,
  name: string,
  email: string,
  created_at: string,
  updated_at: string,
  promoted_set: PromotedSet | null
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