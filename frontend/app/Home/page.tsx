'use client'
import { JSX } from 'react';
import { useGetUsers } from '../hooks/useGetUsers';

type User = {
  id: string,
  name: string,
  email: string,
  createdAt: string,
  updatedAt: string
}


const signOut = () => {
  localStorage.removeItem('token');
}

const Home = (): JSX.Element => {
  const { data, loading, error } = useGetUsers();

  const renderUserData = () => {
    if (data.length === 0) return null;

    return (
      data.map((user: User, idx: number) =>
        <div key={idx}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      )
    )
  }

  return (
    <main>
      <header>
        <div className="display-flex width-full">
          <h1>Home</h1>
          <button onClick={signOut} className="p-5 cursor-pointer border-1 border-white border-solid radius-sm">Sign Out</button>
        </div>
      </header>

      <section>
        {loading && <div><p>Loading...</p></div>}
        {renderUserData()}
        {error && <div><p className="text-red-50">{error}</p></div>}
      </section>
    </main>
  )
}

export default Home;