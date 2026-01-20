'use client'

import Link from 'next/link';

import { useAuth } from '../context/AuthProvider';

export const TopNav = () => {
  const { setUser } = useAuth();

  const signOut = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  return (
    <nav className="h-80 p-20 flex justify-between w-full" aria-label="Primary">
      <Link className="hover:opacity-80" href={{ pathname: '/' }}><p className="text-2xl">ENCORE ME</p></Link>

      <span>
        <button onClick={signOut} className="h-44 p-5 cursor-pointer">Sign Out</button>
      </span>
    </nav>
  )
}