'use client'

import { useGetAuthenticatedUser } from '../hooks/useGetAuthenticatedUser';
import { useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AuthContext, { AuthContextType } from './AuthContext';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, setUser, loading, errorMessage } = useGetAuthenticatedUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const publicRoutes = ['/Signup', '/signup'];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!user && !isPublicRoute) {
      // User is not authenticated and trying to access protected route
      router.replace('/Signup');
    } else if (user && isPublicRoute) {
      // User is authenticated and on public route (like signup/login)
      router.replace('/');
    }
    console.log(user);
  }, [user, loading, pathname, router]);

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