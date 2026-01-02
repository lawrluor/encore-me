import { useState, useEffect } from 'react';

type Act = {
  id: string,
  name: string,
  description: string
}

export const useGetActs = () => {
  const [acts, setActs] = useState<Act[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchActs = async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acts`;
      try {
        setLoading(true);
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error(`Error fetching acts: ${response.status}`);
        const result = await response.json();
        console.log(result);

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

  return { acts, loading, errorMessage };
}