import { useState } from 'react';

type postData = {
  actId: string,
  title: string,
  description: string
}

type PostSetResults = {
  responseOk: boolean | undefined,
  loading: boolean,
  errorMessage: string,
  postData: (data: postData) => Promise<boolean | undefined>
}

export const usePostSet = (): PostSetResults => {
  const [responseOk, setResponseOk] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const postData = async (data: postData) => {
    try {
      setErrorMessage("");
      setLoading(true);

      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sets`;
      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Response error:', response.status, errorData);
        throw new Error(`Response: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();
      setResponseOk(result.success);
      return result;
    } catch (err) {
      if (err instanceof Error) setErrorMessage(err.message);
      else setErrorMessage(String(err));
      console.error(err);
      setResponseOk(false);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { responseOk, loading, errorMessage, postData };
}