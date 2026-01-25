import { useState } from 'react';

import { postAct } from '../services/actService';

type ActFormPayload = {
  name: string;
  description: string;
}

// optional
type useCreateActReturn = {
  executeCreateAct: (payload: ActFormPayload) => Promise<boolean>,
  loading: boolean;
  errorMessage: string;
}

export const useCreateAct = (): useCreateActReturn => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // return either result object or false
  const executeCreateAct = async (payload: ActFormPayload) => {
    try {
      setLoading(true);
      const result = await postAct(payload);
      return result;
    } catch (err) {
      console.error(err);
      // Optional display actual error message to user: setErrorMessage(err instanceof Error ? err.message : String(err))
      setErrorMessage("Something went wrong. Please try again later.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { executeCreateAct, loading, errorMessage };
}