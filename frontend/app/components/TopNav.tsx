'use client'

import Link from 'next/link';

import { useAuth } from '../context/AuthProvider';

export const TopNav = () => {
  const { setUser } = useAuth();

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <nav className="px-5 flex justify-between w-full">
      <Link className="hover:opacity-80" href={{ pathname: '/' }}><p>Encore Me</p></Link>

      <span>
        <button onClick={signOut} className="h-44 p-5 cursor-pointer rounded-sm bg-red-900">Sign Out</button>
      </span>
    </nav>
  )
}