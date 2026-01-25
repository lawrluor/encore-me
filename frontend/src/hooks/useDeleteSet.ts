'use client';

import { useState } from 'react';

import { deleteSet } from '../services/setService';

type ReturnProps = {
  executeDelete: (setId: string) => void;
  loading: boolean;
  errorMessage: string;
}

export const useDeleteSet = (): ReturnProps => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const executeDelete = async (setId: string) => {
    if (loading) return;

    try {
      setLoading(true);
      await deleteSet(setId);  // true or throws error
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return { executeDelete, loading, errorMessage };
}