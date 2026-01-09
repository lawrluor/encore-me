import { useState } from 'react';


export const useDeleteSet = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const deleteSet = async (uuid: string) => {
    setLoading(true);

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sets/${uuid}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const message = await response.json();
        throw new Error(message);
      }

      const result = await response.json();
      if (!result) throw new Error(result);

      setResult(result);
      return result;
    } catch (err) {
      if (err instanceof Error) setErrorMessage(err.message);
      else setErrorMessage(String(err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { deleteSet, result, loading, errorMessage };
}