import { useState, useEffect } from 'react';
import { getQR } from '../services/qrService';

export const useGetQR = (text: string) => {
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const executeGetQR = async (text: string) => {
    if (loading) return;

    try {
      setLoading(true);
      const result = await getQR(text);  // throws if doesn't succeed
      console.log("qr:", result);
      setQrUrl(result.url);
    } catch (err) {
      console.log(err);
      setErrorMessage("QR Code couldn't be displayed. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    executeGetQR(text);
  }, [text])

  return { qrUrl, loading, errorMessage };
}