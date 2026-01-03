'use client'

import { useState } from 'react';

import Link from 'next/link';

import { ActsList } from '../components/ActsList';
import { Setlist } from '../components/Setlist';
import { CreateActForm } from '../components/CreateActForm';

import { useAuth } from '../context/AuthProvider';

const Home = () => {
  const { user, setUser } = useAuth();
  const [createActFormHidden, setCreateActFormHidden] = useState(true);

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <main>
      <header>
        <nav className="px-5 flex justify-between w-full">
          <Link href={{ pathname: '/' }}><p>Home</p></Link>

          <span>
            <p>{user?.name}</p>
            <button onClick={signOut} className="h-44 p-5 cursor-pointer rounded-sm bg-red-900">Sign Out</button>
          </span>
        </nav>
      </header>

      <section className="p-5">
        <h2 className="font-bold text-2xl">ACTS</h2>
        <ActsList />
        <button onClick={() => setCreateActFormHidden(!createActFormHidden)} className="h-44 p-5 font-bold" aria-controls="createActForm" aria-expanded={!createActFormHidden}>
          <h2>{createActFormHidden ? "+ add an act" : "- hide form"}</h2>
        </button>
        <CreateActForm id={"createActForm"} hidden={createActFormHidden} />
      </section>

      {/*<section className="p-5">
        <h2 className="text-bold">SETLISTS</h2>
      </section>*/}
    </main>
  )
}

export default Home;