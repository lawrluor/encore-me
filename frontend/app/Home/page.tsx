'use client'

import { ActsList } from '../components/ActsList';

const Home = () => {
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
        <h2>Acts</h2>
        <ActsList />
      </section>
    </main>
  )
}

export default Home;