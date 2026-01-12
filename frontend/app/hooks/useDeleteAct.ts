import { useState } from 'react';
import { deleteAct } from '../services/actService';

export const useDeleteAct = () => {
  const [result, setResult] = useState<object | Error | null>(null);
  const [loading, setLoading] = useState(false);

  const executeDelete = async (actId: string) => {
    if (loading) return;

    try {
      setLoading(true);
      setResult(null);
      const result = await deleteAct(actId);
      setResult({ 'success': result.message });
    } catch (err) {
      console.error(err);
      // const message = err instanceof Error ? err.message : String(err);
      setResult({ 'error': 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  }

  return { result, executeDelete, loading }
}