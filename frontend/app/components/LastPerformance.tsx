'use client';

import Image from 'next/image';
import { SetCard } from './components/SetCard';

import { useAuth } from '../context/AuthProvider';

export const LastPerformance = () => {
  const { user, loading, errorMessage } = useAuth();

  return (
    <div>
      <h2>Last Performance</h2>
      <p>{user?.promoted_set_id && "You haven&apos;t promoted a set yet"}</p>
      {/*<SetCard />*/}
      {/*<Image src={act.qr_code} alt="QR Code" width={200} height={200} />*/}
    </div>
  )
}