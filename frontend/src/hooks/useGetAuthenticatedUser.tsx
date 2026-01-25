'use client'

import { useState, useEffect } from 'react';

import type { User } from '../types/user';

type GetAuthenticatedUserResult = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  errorMessage: string;
}

export const useGetAuthenticatedUser = (): GetAuthenticatedUserResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`;

        const response = await fetch(endpoint, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`Response failed: ${response.status}, ${JSON.stringify(response)}`);
        }

        const result = await response.json();
        if (!result || !result.data) throw new Error(`Expected an object with field 'data', got ${JSON.stringify(result)}`);
        setUser(result.data);
      } catch (err) {
        console.error(err);
        setErrorMessage(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return { user, setUser, loading, errorMessage };
}