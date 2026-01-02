'use client'

import { useGetAuthenticatedUser } from '../hooks/useGetAuthenticatedUser';
import { useContext, ReactNode } from 'react';
import AuthContext, { AuthContextType } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, setUser, loading, errorMessage } = useGetAuthenticatedUser();

  return (
    <AuthContext.Provider value={{ user, setUser, loading, errorMessage }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};