import { useState, useEffect } from 'react';

type Set = {
  id: string,
  title: string,
  description?: string
}

type GetSetsResults = {
  data: Set[],
  loading: boolean,
  errorMessage: string
}

type Props = {
  actId: string
}

// TODO: given user object from auth, get act id, and pass act id into body
export const useGetSets = ({ actId }: Props): GetSetsResults => {
  const [data, setData] = useState<Set[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSets = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authorization token found.');

        const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sets?actId=${actId}`;
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error(`${response.status}: ${JSON.stringify(response)}`);
        const result = await response.json();
        if (!result || !result.data) throw new Error(`Expected array of objects, got ${result}`);
        setData(result.data);
        return result.data;
      } catch (err) {
        console.error(err);
        setErrorMessage('Something went wrong. Please try again later');
      } finally {
        setLoading(false);
      }
    }

    fetchSets();
  }, [actId])

  return { data, loading, errorMessage };
}

