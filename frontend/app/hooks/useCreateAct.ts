import { useState } from 'react';

import { createAct } from '../services/actService';

type ActFormPayload = {
  name: string,
  description: string
}

// optional
type useCreateActReturn = {
  executeCreateAct: (payload: ActFormPayload) => Promise<boolean>,
  loading: boolean,
  errorMessage: string
}

export const useCreateAct = (): useCreateActReturn => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // return either result object or Error (object)
  const executeCreateAct = async (payload: ActFormPayload) => {
    try {
      setLoading(true);
      const result = await createAct(payload);  // returns true or errors
      return result;
    } catch (err) {
      console.error(err);
      // Optional display actual error message to user: setErrorMessage(err instanceof Error ? err.message : String(err))
      setErrorMessage("Something went wrong. Please try again later.");
      return err;
    } finally {
      setLoading(false);
    }
  }

  return { executeCreateAct, loading, errorMessage };
}