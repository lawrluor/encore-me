'use client'

import Link from 'next/link';

import { logoutUserAction } from '../actions/authActions';

export const TopNav = () => {
  return (
    <nav className="h-80 p-20 flex justify-between w-full" aria-label="Primary">
      <Link className="hover:opacity-80" href={{ pathname: '/Home' }}><p className="text-2xl">ENCORE ME</p></Link>

      <span>
        <button onClick={logoutUserAction} className="h-44 p-5 cursor-pointer">Sign Out</button>
      </span>
    </nav>
  )
}