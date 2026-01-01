'use client'
import { JSX, useEffect, useState } from 'react';

type User = {
  id: string,
  name: string,
  email: string,
  createdAt: string,
  updatedAt: string
}

const Home = (): JSX.Element => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`;
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
        const result = await response.json();
        console.log(result.data);
        setData(result?.data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(`Error: ${err.message}`);
        } else {
          console.error(`Unknown Error`, err);
        }
        setError('Something went wrong. Please try again later.')
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

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
        {error && <div><p className="color-red">{error}</p></div>}
      </section>
    </main>
  )
}

export default Home;