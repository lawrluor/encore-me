'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router) return;

    const token = localStorage.getItem('token');
    if (token && router.pathname!=="Home") {
      router.push('/Home');
    } else if (!token && router.pathname!=="Signup") {
      router.push('/Signup');
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">

    </div>
  );
}

export default Home;