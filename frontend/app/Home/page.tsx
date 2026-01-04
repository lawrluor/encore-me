'use client'

import { useState } from 'react';

import { ActsList } from '../components/ActsList';
import { CreateActForm } from '../components/CreateActForm';
import { TopNav } from '../components/TopNav';

const Home = () => {
  const [createActFormHidden, setCreateActFormHidden] = useState(true);

  return (
    <main>
      <header>
        <TopNav />
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
        <h2 className="text-bold">SETS</h2>
      </section>*/}
    </main>
  )
}

export default Home;