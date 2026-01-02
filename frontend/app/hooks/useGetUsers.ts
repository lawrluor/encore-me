type User = {
  id: string,
  name: string,
  email: string,
  createdAt: string,
  updatedAt: string
}

type GetUsersResult = {
  data: User[],
  loading: boolean,
  errorMessage: string
}

import { useState, useEffect } from 'react';

export const useGetUsers = ():GetUsersResult => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage('Something went wrong. Please try again later.')
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  return { data, loading, errorMessage };
}