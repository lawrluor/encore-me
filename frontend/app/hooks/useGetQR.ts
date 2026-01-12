import { useState } from 'react';
import { getQR } from '../services/qrService';

export const useGetQR = () => {
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const executeGetQR = async (text: string) => {
    try {
      if (loading) return;

      setLoading(true);
      setErrorMessage("");
      const result = await getQR(text);
      setQrUrl(result.url);
    } catch (err) {
      console.error(err);
      setErrorMessage("QR Code couldn't be displayed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { qrUrl, loading, errorMessage, executeGetQR };
}