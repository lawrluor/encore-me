'use client';

import Image from 'next/image';

import { useAuth } from '../context/AuthProvider';

import { SetCard } from './SetCard';

export const LastPerformance = () => {
  const { user, loading, errorMessage } = useAuth();

  if (loading) return <p>Loading...</p>;
  
  return (
    <div>
      <h2>Last Performance</h2>
      {user?.promoted_set ?
        <SetCard
          actId={user.promoted_set.act_id}
          set={user.promoted_set}
        />
        :
        <p>You haven&apos;t promoted a set yet.</p>
      }
      {/*<Image src={act.qr_code} alt="QR Code" width={200} height={200} />*/}
    </div>
  )
}


