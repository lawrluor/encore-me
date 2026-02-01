'use client'

import Link from 'next/link';

import { logoutUserAction } from '../actions/authActions';
import { Button } from './Button';

export const TopNav = () => {
  return (
    <nav className="px-30 py-20 flex justify-between items-center w-full border-b-1 border-surface-muted" aria-label="Primary">
      <Link className="hover:opacity-60" href='/Home'><p className="text-2xl">ENCORE ME</p></Link>

      <Button onClick={logoutUserAction} className="h-44 cursor-pointer hover:opacity-60" aria-label="Log Out">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-door-open-icon lucide-door-open"><path d="M11 20H2" /><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" /><path d="M11 4H8a2 2 0 0 0-2 2v14" /><path d="M14 12h.01" /><path d="M22 20h-3" /></svg>
      </Button>
    </nav>
  )
}