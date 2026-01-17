import { useState } from 'react';

import { deleteSet } from '../services/setService';

export const useDeleteSet = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const executeDelete = async (setId: string) => {
    if (loading) return;

    try {
      setLoading(true);
      const result = await deleteSet(setId);  // true or throws error
      return result;
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return { executeDelete, loading, errorMessage };
}