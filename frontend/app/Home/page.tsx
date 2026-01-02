'use client'

import { useState } from 'react';
import { ActsList } from '../components/ActsList';
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
        <div className="flex justify-between w-full">
          <h1>Home</h1>

          <span>
            <h2>Welcome, {user.name}</h2>
            <button onClick={signOut} className="h-44 p-5 cursor-pointer border-1 border-white border-solid radius-sm">Sign Out</button>
          </span>
        </div>
      </header>

      <section>
        <h2>Acts</h2>
        <ActsList />
        <button onClick={() => setCreateActFormHidden(!createActFormHidden)} className="h-44 p-5 font-bold" aria-controls="createActForm" aria-expanded={!createActFormHidden}>
          <h2>{createActFormHidden ? "+ add an act" : "- hide form"}</h2>
        </button>
        <CreateActForm id={"createActForm"} hidden={createActFormHidden} />
      </section>
    </main>
  )
}

export default Home;