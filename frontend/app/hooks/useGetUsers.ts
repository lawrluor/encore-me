import { useState, useEffect } from 'react';

export const useGetUsers = () => {
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

  return { data, loading, error };
}