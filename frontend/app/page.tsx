'use client'

import { useState } from 'react';
import Image from 'next/image';

import { useGetQR } from './hooks/useGetQR';

import { ActsList } from './components/ActsList';
import { ActCardsList } from './components/ActCardsList';
import { CreateActForm } from './components/CreateActForm';
import { TopNav } from './components/TopNav';

const Home = () => {
  const [createActFormHidden, setCreateActFormHidden] = useState(true);

  return (
    <div>
      <header>
        <TopNav />
      </header>

      <aside>
        <ActsList />
      </aside>

      <main>
        <section>
          {/* Featured <Set /> */}
        </section>

        <section className="w-6/10 mx-auto p-10 rounded-md">
          <h2 className="font-bold text-2xl">ACTS</h2>
          <ActCardsList />
          <button onClick={() => setCreateActFormHidden(!createActFormHidden)} className="h-44 p-5 font-bold cursor-pointer" aria-controls="createActForm" aria-expanded={!createActFormHidden}>
            <h2>{createActFormHidden ? "+ add an act" : "- hide form"}</h2>
          </button>
          <CreateActForm id={"createActForm"} hidden={createActFormHidden} />
        </section>
      </main>

      {/*<section className="p-5">
        <h2 className="text-bold">SETS</h2>
      </section>*/}
    </div>
  )
}

export default Home;
