import { useState } from 'react';

import { deleteAct } from '../services/actService';

type useDeleteActState = { success?: boolean, error?: never } |
{ error?: string, success?: never } |
  null;


type useDeleteActReturn = {
  state: useDeleteActState;
  executeDelete: (actId: string) => Promise<void>;
  pending: boolean;
}

export const useDeleteAct = (): useDeleteActReturn => {
  const [state, setState] = useState<useDeleteActState>(null);
  const [pending, setPending] = useState(false);

  const executeDelete = async (actId: string) => {
    if (pending) return;

    try {
      setPending(true);
      setState(null);
      const result = await deleteAct(actId);
      setState({ 'success': result });
    } catch (err) {
      console.error(err);
      // const message = err instanceof Error ? err.message : String(err);
      setState({ 'error': 'Something went wrong. Please try again later.' });
    } finally {
      setPending(false);
    }
  }

  return { state, executeDelete, pending }
}