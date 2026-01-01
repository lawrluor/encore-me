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
        <h1>Home</h1>
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