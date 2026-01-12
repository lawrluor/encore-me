'use client'

import { useState } from 'react';
import Image from 'next/image';

import { useGetQR } from '../hooks/useGetQR';

import { ActsList } from '../components/ActsList';
import { ActCardsList } from '../components/ActCardsList';
import { CreateActForm } from '../components/CreateActForm';
import { TopNav } from '../components/TopNav';


const Home = () => {
  const [createActFormHidden, setCreateActFormHidden] = useState(true);
  const { qrUrl, loading, errorMessage, executeGetQR } = useGetQR();

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
          {/* QR Code Generator */}
          <div className="p-5">
            <button
              onClick={() => executeGetQR("test")}
              disabled={loading}
              className={`ml-2 p-2 ${loading ? 'bg-gray-500' : 'bg-blue-500'} cursor-pointer`}
            >
              {loading ? 'Generating...' : 'Generate QR'}
            </button>
            <p className="text-red-500">{errorMessage}</p>
          </div>

          {qrUrl && <Image src={qrUrl} alt="QR Code for Act" width="200" height="200" />}
        </section>

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