'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!router) return;

    if (token && router.pathname!=="Home") {
      router.push('/Home');
    } else if (!token && router.pathname!=="Signup") {
      router.push('/Signup');
    }
  }, [router, token])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">

    </div>
  );
}

export default Home;