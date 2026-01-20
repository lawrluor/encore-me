'use client';

import Image from 'next/image';

import { useAuth } from '../context/AuthProvider';

import { SetCard } from './SetCard';

export const LastPerformance = () => {
  const { user, loading, errorMessage } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (errorMessage) return <p className="text-red-500">Something went wrong. Please try again later.</p>;

  return (
    <div className="p-20 bg-gray-900 rounded-md w-400">
      <h2 className="text-2xl">Recent Sets</h2>
      {user?.promoted_set ?
        <SetCard
          actId={user.promoted_set.act_id}
          set={user.promoted_set}
        />
        :
        <p>You haven&apos;t promoted a set yet.</p>
      }

      {user?.qr_code && (
        <Image src={user.qr_code} alt="User QR Code" width={200} height={200} />
      )}
    </div>
  );
}


