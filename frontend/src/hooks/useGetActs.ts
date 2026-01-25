import { useState, useEffect } from 'react';

import { type Act } from '../types/act';

type GetActsResult = {
  acts: Act[];
  setActs: React.Dispatch<React.SetStateAction<Act[]>>;
  loading: boolean;
  errorMessage: string;
}

export const useGetActs = (): GetActsResult => {
  const [acts, setActs] = useState<Act[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchActs = async () => {
      try {
        setLoading(true);
        const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acts`;
        const response = await fetch(endpoint, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          console.error(response);
          throw new Error(`Error fetching acts: ${response.status}`);
        }
        const result = await response.json();

        if (!result?.data || !(Array.isArray(result.data)))
          throw new Error("Malformed data. Expected an array of Act objects.");
        setActs(result.data);
      } catch (err) {
        console.error(err);
        setErrorMessage('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchActs();
  }, [])

  return { acts, setActs, loading, errorMessage };
}