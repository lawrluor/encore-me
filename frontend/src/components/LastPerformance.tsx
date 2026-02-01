import Image from 'next/image';

import { findUserById } from '../lib/db/users';
import { getAuthUser } from '../services/authService';
import { type User } from '../types/user';

import { SetCard } from './SetCard';

export const LastPerformance = async () => {
  const authUser = await getAuthUser();
  if (!authUser) return null;  // not authenticated. User should have been redirected by parent component

  // Fetch full user data including promoted_set and qr_code directly from DB
  const user = await findUserById(authUser.id) as User | null;

  return (
    <div className="p-20 bg-gray-900 rounded-md">
      {user?.promoted_set ?
        <SetCard
          actId={user.promoted_set.act_id}
          set={user.promoted_set}
        />
        :
        <p className="w-200">Select a set to display when people scan your QR code.</p>
      }

      {user?.qr_code && (
        <Image src={user.qr_code} alt="User QR Code" width={200} height={200} />
      )}
    </div>
  );
}


