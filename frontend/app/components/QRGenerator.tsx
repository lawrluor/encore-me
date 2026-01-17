import Image from 'next/image';

import { useGetQR } from '../hooks/useGetQR';

export const QRGenerator = () => {
  const { qrUrl, loading, errorMessage, executeGetQR } = useGetQR();

  return (
    <div>
      <div className="p-5" >
        <button
          onClick={() => executeGetQR("test")}
          disabled={loading}
          className={`ml-2 p-2 ${loading ? 'bg-gray-500' : 'bg-blue-500'} cursor-pointer`}
        >
          {loading ? 'Generating...' : 'Generate QR'}
        </button>
        <p className="text-red-500">{errorMessage}</p>
      </div >

      {qrUrl && <Image src={qrUrl} alt="QR Code for Act" width="200" height="200" />}
    </div>
  )
}