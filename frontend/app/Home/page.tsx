'use client'

import { useGetActs } from '../hooks/useGetActs';

const Home = () => {
  const { acts, loading, error } = useGetActs();

  const signOut = () => {
    localStorage.removeItem('token');
  }

  return (
    <main>
      <header>
        <div className="flex w-full">
          <h1>Home</h1>
          <button onClick={signOut} className="p-5 cursor-pointer border-1 border-white border-solid radius-sm">Sign Out</button>
        </div>
      </header>

      <section>
        {loading && <p>Loading...</p>}

        {acts?.map(act =>
          <div key={act.id}>
            <p>{act.name}</p>
            <p>{act.description}</p>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </section>
    </main>
  )
}

export default Home;