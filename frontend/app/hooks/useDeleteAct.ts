import { useState } from 'react';
import { deleteAct } from '../services/actService';

export const useDeleteAct = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const executeDelete = async (actId: string) => {
    if (loading) return;

    try {
      setLoading(true);
      setErrorMessage("");
      const result = await deleteAct(actId);
      return result;  // must be true, otherwise error was thrown
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again later.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { executeDelete, loading, errorMessage }
}