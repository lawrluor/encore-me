'use client'

import { useState, useEffect } from 'react';

type User = {
  id: string
  name: string,
  email: string,
  createdAt: string
}

type GetAuthenticatedUserResult = {
  user: User | null,
  setUser: (user: User | null) => void,
  loading: boolean,
  errorMessage: string
}

export const useGetAuthenticatedUser = (): GetAuthenticatedUserResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`; // User must sign in

        console.log(endpoint, token);

        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`Response failed: ${response.status}, ${JSON.stringify(response)}`);
        }

        const result = await response.json();
        console.log(result);
        if (!result || !result.data) throw new Error(`Expected an object with field 'data', got ${JSON.stringify(result)}`);
        setUser(result.data);
      } catch (err) {
        console.error(err);
        setErrorMessage(err instanceof Error ? err.message : String(err));
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return { user, setUser, loading, errorMessage };
}